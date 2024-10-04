import { Link } from "@remix-run/react";
import { loader } from "~/routes/_index";

export default function EntryListItem({
  entry,
  canEdit,
}: {
  entry: Awaited<ReturnType<typeof loader>>["entries"][number];
  canEdit: boolean;
}) {
  console.log(canEdit);
  return (
    <li className="group leading-7">
      {entry.text}{" "}
      {canEdit && (
        <Link
          to={`/entries/${entry.id}/edit`}
          className="ml-2 text-sky-500 opacity-0 group-hover:opacity-100"
        >
          Edit
        </Link>
      )}
    </li>
  );
}
