import { redirect } from "@remix-run/node";

export function loader({ params }) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }

  return new Response("Not found", { status: 404 });
}
