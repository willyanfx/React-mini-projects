import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";

import homeStyles from "~/styles/note-details.css";
export function links() {
  return [{ rel: "stylesheet", href: homeStyles }];
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params["noteId"];

  const selectedNote = notes.find((note) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: "Could not find note " + noteId },
      {
        status: 404,
      }
    );
  }
  return selectedNote;
}

export function meta({ data }) {
  return {
    title: data.title,
    description: data.content,
  };
}

export default function NoteDetailsPage() {
  const note = useLoaderData();
  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Return to Notes</Link>
        </nav>
      </header>
      <h1>{note.title} </h1>
      <p id='note-details-content'>{note.content}</p>
    </main>
  );
}
