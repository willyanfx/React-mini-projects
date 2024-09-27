import { Link } from "@remix-run/react";
import { loader } from "~/routes/_index";

export default function EntryListItem({
  entry,
}: {
  entry: Awaited<ReturnType<typeof loader>>[number];
}) {
  return (
    <li className='group'>
      {entry.text}{" "}
      <Link
        to={`/entries/${entry.id}/edit`}
        className='ml-2 text-blue-500 opacity-0 group-hover:opacity-100'
      >
        Edit
      </Link>
    </li>
  );
}
