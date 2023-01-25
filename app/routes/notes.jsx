import { Link } from "@remix-run/react";

export default function NotesPage() {
  return (
    <main>
      <h1>My notes</h1>
      <p>Try our warly beta and never loose track of your notes again!</p>
      <p id='cta'>
        <Link to='/'>back</Link>
      </p>
    </main>
  );
}
