import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import NewNote, { links as newNotesStyles } from "~/components/NewNote";
import NoteList, { links as noteListStyles } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export function links() {
  return [...newNotesStyles(), ...noteListStyles()];
}

export async function action({ request }) {
  const form = await request.formData();
  const noteData = Object.fromEntries(form);
  console.log(noteData);
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
      <p id='cta'>
        <Link to='/'>back</Link>
      </p>
    </main>
  );
}
