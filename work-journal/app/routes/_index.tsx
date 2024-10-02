import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { format, parseISO, startOfWeek } from "date-fns";
import { useRef } from "react";
import EntryForm from "~/components/EntryForm";
import EntryListItem from "~/components/EntryListItem";
import prisma from "~/db.server";
import { getSession } from "~/session";

export const meta: MetaFunction = () => {
  return [
    { title: "Work Journal" },
    { name: "description", content: "Welcome to Work Journal!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);

  await prisma.entry.create({
    data: {
      date: new Date(data.date),
      type: data.type,
      text: data.text,
    },
  });
  return redirect("/");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  const entries = await prisma.entry.findMany();

  return {
    entries: entries.map((entry) => ({
      ...entry,
      date: entry.date.toISOString().substring(0, 10),
    })),
    session: session.data,
  };
}

export default function Index() {
  const { entries, session } = useLoaderData<typeof loader>();

  const entriesByWeek = entries.reduce<Record<string, typeof entries>>(
    (memo, entry) => {
      const sunday = startOfWeek(parseISO(entry.date));
      const sundayString = format(sunday, "yyyy-MM-dd");

      memo[sundayString] ||= [];
      memo[sundayString].push(entry);

      return memo;
    },
    {}
  );

  const weeks = Object.keys(entriesByWeek)
    .sort((a, b) => a.localeCompare(b))
    .map((dateString) => ({
      dateString,
      work: entriesByWeek[dateString].filter((entry) => entry.type === "work"),
      learning: entriesByWeek[dateString].filter(
        (entry) => entry.type === "learning"
      ),
      leisure: entriesByWeek[dateString].filter(
        (entry) => entry.type === "leisure"
      ),
    }));

  return (
    <>
      {session.isAdmin && (
        <div className="my-8 border p-3">
          <p className="italic">Create an entry</p>
          <EntryForm />
        </div>
      )}

      {weeks.map((week) => (
        <div key={week.dateString}>
          <p className="font-bold">
            Week of {format(parseISO(week.dateString), "MMMM do")}
          </p>
          <div className="mt-3 space-y-4">
            {week.work.length > 0 && (
              <div>
                <p>Work</p>
                <ul className="ml-8 list-disc">
                  {week.work.map((entry) => (
                    <EntryListItem key={entry.id} entry={entry} />
                  ))}
                </ul>
              </div>
            )}
            {week.learning.length > 0 && (
              <div>
                <p>Learning</p>
                <ul className="ml-8 list-disc">
                  {week.learning.map((entry) => (
                    <EntryListItem key={entry.id} entry={entry} />
                  ))}
                </ul>
              </div>
            )}
            {week.leisure.length > 0 && (
              <div>
                <p>Interesting things</p>
                <ul className="ml-8 list-disc">
                  {week.leisure.map((entry) => (
                    <EntryListItem key={entry.id} entry={entry} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
