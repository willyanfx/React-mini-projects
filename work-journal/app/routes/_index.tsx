import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { format, parseISO, startOfWeek } from "date-fns";
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
      {session.admin && (
        <div className="mb-8 rounded-lg border border-gray-700/30 bg-gray-800/50 p-4 lg:mb-20 lg:p-6">
          <p className="text-sm font-medium text-gray-500 lg:text-base">
            New entry
          </p>

          <EntryForm />
        </div>
      )}
      <div className="mt-12 space-y-12 border-l-2 border-sky-500/[.15] pl-5 lg:space-y-20 lg:pl-8">
        {weeks.map((week) => (
          <div key={week.dateString} className="relative">
            <div className="absolute left-[-34px] rounded-full bg-gray-900 p-2 lg:left-[-46px]">
              <div className="h-[10px] w-[10px] rounded-full border border-sky-500 bg-gray-900" />
            </div>

            <p className="pt-[5px] text-xs font-semibold uppercase tracking-wider text-sky-500 lg:pt-[3px] lg:text-sm">
              {format(parseISO(week.dateString), "MMMM d, yyyy")}
            </p>

            <div className="mt-6 space-y-8 lg:space-y-12">
              <EntryList
                entries={week.work}
                label="Work"
                canEdit={session.admin}
              />
              <EntryList
                entries={week.learning}
                label="Learnings"
                canEdit={session.admin}
              />
              <EntryList
                entries={week.leisure}
                label="Leisure"
                canEdit={session.admin}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
type Entry = Awaited<ReturnType<typeof loader>>["entries"][number];

function EntryList({
  entries,
  label,
  canEdit,
}: {
  entries: Entry[];
  label: string;
  canEdit: boolean;
}) {
  return entries.length > 0 ? (
    <div>
      <p className="font-semibold text-white">{label}</p>

      <ul className="mt-4 space-y-6">
        {entries.map((entry) => (
          <EntryListItem key={entry.id} entry={entry} canEdit={canEdit} />
        ))}
      </ul>
    </div>
  ) : null;
}
