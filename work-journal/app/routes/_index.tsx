import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useFetcher } from "@remix-run/react";
import { format } from "date-fns";
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

  return entries;
}

export default function Index() {
  const fetcher = useFetcher();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
                      checked={index === 0}
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

      <div className='mt-6'>
        <p className='font-bold'>
          Week of February 20<sup>th</sup>
        </p>
        <div className='mt-3 space-y-4'>
          <div>
            <p>Work</p>
            <ul className='list-disc ml-8'>
              <li>First item</li>
              <li>Second Item</li>
            </ul>
          </div>
          <div>
            <p>Learnings</p>
            <ul className='list-disc ml-8'>
              <li>First item</li>
              <li>Second Item</li>
            </ul>
          </div>
          <div>
            <p>Interesting thing</p>
            <ul className='list-disc ml-8'>
              <li>First item</li>
              <li>Second Item</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
