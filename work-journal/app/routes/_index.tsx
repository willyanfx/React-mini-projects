import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { format, formatISO, parseISO, startOfWeek } from "date-fns";
import { useEffect, useRef } from "react";
import prisma from "~/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Work Journal" },
    { name: "description", content: "Welcome to Work Journal!" },
  ];
};

const options = [
  { name: "type", value: "work" },
  { name: "type", value: "learning" },
  { name: "type", value: "leisure" },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  await prisma.entry.create({
    data: {
      date: new Date(data.date),
      type: data.type,
      text: data.text,
    },
  });
  return redirect("/");
}

export async function loader() {
  const entries = await prisma.entry.findMany();

  return entries.map((entry) => ({
    ...entry,
    date: entry.date.toISOString().substring(0, 10),
  }));
}

export default function Index() {
  const fetcher = useFetcher();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const entries = useLoaderData<typeof loader>();

  const entriesByWeek = entries.reduce<Record<string, typeof entries>>(
    (memo, entry) => {
      const sunday = startOfWeek(parseISO(entry.date));
      const sudayString = format(sunday, "yyyy-MM-dd");

      memo[sudayString] ||= [];
      memo[sudayString].push(entry);

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

  useEffect(() => {
    if (fetcher.state === "idle" && textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current?.focus();
    }
  }, [fetcher.state]);

  return (
    <div className='p-10'>
      <h1 className='text-5xl'>Work Journal</h1>
      <p>Learning and doing. Update weekly.</p>

      <div className='my-8 border p-3'>
        <p className='italic'>Create an entry</p>
        <fetcher.Form method='POST'>
          <fieldset
            className='disabled:opacity-75'
            disabled={fetcher.state === "submitting"}
          >
            <div className=''>
              <div className='mt-4'>
                <input
                  type='date'
                  required
                  name='date'
                  className='text-gray-600'
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
              <div className='mt-4 space-x-6'>
                {options.map((option, index) => (
                  <label
                    key={`${index}-${option.value}`}
                    className='capitalize'
                  >
                    <input
                      className='mr-1'
                      type='radio'
                      name={`${option.name}`}
                      value={`${option.value}`}
                      required
                    />
                    {option.value}
                  </label>
                ))}
              </div>
              <div className='mt-2'>
                <textarea
                  name='text'
                  className='w-full text-gray-700'
                  rows={3}
                  required
                  ref={textareaRef}
                  placeholder='Type your entry'
                />
              </div>
              <div className='mt-1 text-right'>
                <button
                  className='bg-blue-500 text-white font-medium px-4 py-1'
                  type='submit'
                >
                  {fetcher.state === "submitting" ? "Saving ..." : "Save"}
                </button>
              </div>
            </div>
          </fieldset>
        </fetcher.Form>
      </div>

      {weeks.map((week) => (
        <div key={week.dateString} className='mt-6'>
          <p className='font-bold'>
            Week of {format(parseISO(week.dateString), "MMMM do")}
          </p>
          <div className='mt-3 space-y-4'>
            {week.work.length > 0 && (
              <div>
                <p>Work</p>
                <ul className='list-disc ml-8'>
                  {week.work.map((entry, index) => (
                    <li key={`${entry.id}-${index}`}>{entry.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {week.learning.length > 0 && (
              <div>
                <p>Learning</p>
                <ul className='list-disc ml-8'>
                  {week.learning.map((entry, index) => (
                    <li key={`${entry.id}-${index}`}>{entry.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {week.leisure.length > 0 && (
              <div>
                <p>Leisure</p>
                <ul className='list-disc ml-8'>
                  {week.leisure.map((entry, index) => (
                    <li key={`${entry.id}-${index}`}>{entry.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
