import { useLoaderData } from "@remix-run/react";

export async function loader({ params }) {
  const id = params["id"];

  return id;
}

export default function UpdatePage() {
  const id = useLoaderData();
  return (
    <>
      <h1>{id} Update Page</h1>
      <p>text</p>
    </>
  );
}
