import { useFetcher } from "@remix-run/react";
import { format } from "date-fns";
import { useRef } from "react";
import { options } from "~/utils/objects";

export default function EntryForm({
  entry,
}: {
  entry: {
    date: string;
    type: string;
    text: string;
    id: number;
  };
}) {
  const fetcher = useFetcher();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
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
              defaultValue={entry.date}
            />
          </div>
          <div className='mt-4 space-x-6'>
            {options.map((option, index) => (
              <label key={`${index}-${option.value}`} className='capitalize'>
                <input
                  className='mr-1'
                  type='radio'
                  name={`${option.name}`}
                  value={`${option.value}`}
                  required
                  defaultChecked={entry.type === option.value ? true : false}
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
              defaultValue={entry.text}
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
  );
}
