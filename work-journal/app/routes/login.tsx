import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/session";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  if (email === "goldines@chaves.com" && password === "123") {
    const session = await getSession();
    session.set("admin", true);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    return json(
      {
        error: "Bad credentials",
      },
      401
    );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  return session.data;
}

export default function LoginPage() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  console.log(actionData?.error);
  return (
    <div className="mt-8">
      {data?.admin ? (
        <p>You're signed in</p>
      ) : (
        <Form method="POST">
          <fieldset className="grid-flow-col gap-1">
            <input
              className={`text-green-900 border border-slate-700 invalid:border-pink-500 invalid:text-pink-600 ${
                actionData?.error ? "border-red-500 border-2" : null
              }`}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className={`text-green-900 border border-slate-700 invalid:border-pink-500 invalid:text-pink-600 ${
                actionData?.error ? "border-red-500 border-2" : null
              }`}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button className="bg-blue-500 px-6 py-2 text-white font-medium">
              Log in
            </button>
          </fieldset>

          {actionData?.error === "Bad credentials" && (
            <p className="text-red-500 font-medium mt-2">{actionData?.error}</p>
          )}
        </Form>
      )}
    </div>
  );
}
