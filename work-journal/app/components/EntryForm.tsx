import { useFetcher } from "@remix-run/react";
import { format } from "date-fns";
import { useRef } from "react";
import { options } from "~/utils/objects";

export default function EntryForm({
  entry,
}: {
  entry?: {
    date: string;
    type: string;
    text: string;
    id: number;
  };
}) {
  const fetcher = useFetcher();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   if (fetcher.state === "idle" && textareaRef.current) {
  //     textareaRef.current.value = "";
  //     textareaRef.current?.focus();
  //   }
  // }, [fetcher.state]);
  return (
    <fetcher.Form method="POST" className="mt-4">
      <fieldset
        className="disabled:opacity-70"
        disabled={fetcher.state !== "idle"}
      >
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="mt-4 lg:order-2">
            <input
              type="date"
              required
              name="date"
              className="w-full rounded-md border-gray-700 bg-gray-800 text-white focus:border-sky-600 focus:ring-sky-600"
              defaultValue={entry?.date ?? format(new Date(), "yyyy-MM-dd")}
            />
          </div>
          <div className="mt-6 flex space-x-4 text-sm lg:mt-0 lg:space-x-6 lg:text-base">
            {options.map((option, index) => (
              <label key={`${index}-${option.value}`} className="capitalize">
                <input
                  className="mr-2 border-gray-700 bg-gray-800 text-sky-600  focus:ring-sky-600 focus:ring-offset-gray-900"
                  type="radio"
                  style={{ colorScheme: "dark" }}
                  name={`${option.name}`}
                  value={`${option.value}`}
                  required
                  defaultChecked={option.value === (entry?.type ?? "work")}
                />
                {option.value}
              </label>
            ))}
          </div>
          <div className="mt-6">
            <textarea
              name="text"
              className="w-full rounded-md border-gray-700 bg-gray-800 text-white focus:border-sky-600 focus:ring-sky-600"
              rows={3}
              required
              ref={textareaRef}
              defaultValue={entry?.text}
            />
          </div>
          <div className="mt-6 text-right">
            <button
              className="w-full rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-900 lg:w-auto lg:py-1.5"
              type="submit"
            >
              {fetcher.state !== "idle" ? "Saving ..." : "Save"}
            </button>
          </div>
        </div>
      </fieldset>
    </fetcher.Form>
  );
}
