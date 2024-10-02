import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/session";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  if (email === "w@w.co" && password === "123") {
    const session = await getSession();
    session.set("admin", true);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    return null;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  return session.data;
}

export default function LoginPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="mt-8">
      {data?.isAdmin ? (
        <p>You're signed in</p>
      ) : (
        <Form method="POST">
          <input
            className="text-green-900"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="text-green-900"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="bg-blue-500 px-4 py-4 text-white font-medium">
            Log in
          </button>
        </Form>
      )}
    </div>
  );
}
