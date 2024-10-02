import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import prisma from "~/db.server";
import { z } from "zod";

const VALUES = ["work", "learning", "leisure"] as const;

const EntryData = z.object({
  date: z.string().date(),
  type: z.enum(VALUES),
  text: z.coerce.string(),
});

type EntryData = z.infer<typeof EntryData>;

import EntryForm from "~/components/EntryForm";
import { FormEvent } from "react";
import { getSession } from "~/session";

export async function action({ request, params }: ActionFunctionArgs) {
  if (typeof params.entryId !== "string") {
    throw new Response("Not found", { status: 404 });
  }

  const formData = await request.formData();

  const { _action, date, type, text } = Object.fromEntries(formData);

  if (_action === "delete") {
    await prisma.entry.delete({
      where: {
        id: Number(params.entryId),
      },
    });
    return redirect("/");
  } else {
    if (
      typeof date !== "string" ||
      typeof type !== "string" ||
      typeof text !== "string"
    ) {
      throw new Error("Bad request");
    }

    await prisma.entry.update({
      where: {
        id: Number(params.entryId),
      },
      data: {
        date: new Date(date),
        type: type,
        text: text,
      },
    });

    return redirect("/");
  }
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  if (typeof params.entryId !== "string") {
    throw new Response("Not Found", { status: 404 });
  }

  const entry = await prisma.entry.findUnique({
    where: { id: Number(params.entryId) },
  });

  if (!entry) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("cookie"));
  console.log(session.data.admin);
  if (!session.data.admin) {
    throw new Response("Not authenticated", { status: 401 });
  }

  return {
    ...entry,
    date: entry.date.toISOString().substring(0, 10),
  };
}

export default function EditPage() {
  const entry = useLoaderData<typeof loader>();

  if (!entry) {
    throw new Response("Not found", { status: 404 });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!confirm("Are you Sure")) {
      e.preventDefault();
    }
  }

  return (
    <div className="mt-4">
      <p className="font-bold">Week of {entry.date}</p>
      <div className="mt-3 space-y-4">
        <EntryForm entry={entry} />
      </div>
      <Form method="POST" onSubmit={handleSubmit} className="mt-8">
        <button
          name="_action"
          value="delete"
          className="underline text-gray-500"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
