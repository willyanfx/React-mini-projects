import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "~/db.server";

import EntryForm from "~/components/EntryForm";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  await prisma.entry.update({
    where: {
      id: Number(params.entryId),
    },
    data: {
      date: new Date(data.date),
      type: data.type,
      text: data.text,
    },
  });

  return redirect("/");
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (typeof params.entryId !== "string") {
    throw new Response("Not Found", { status: 404 });
  }

  const entry = await prisma.entry.findUnique({
    where: { id: Number(params.entryId) },
  });

  if (!entry) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    ...entry,
    date: entry.date.toISOString().substring(0, 10),
  };
}

export default function EditPage() {
  const entry = useLoaderData<typeof loader>();
  console.log(entry);
  return (
    <div className='mt-4'>
      <p className='font-bold'>Week of {entry.date}</p>
      <div className='mt-3 space-y-4'>
        <EntryForm entry={entry} />
      </div>
    </div>
  );
}
