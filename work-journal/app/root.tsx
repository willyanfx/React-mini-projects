import {
  Form,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";

import styles from "./tailwind.css?url";
import { destroySession, getSession } from "./session";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  return {
    session: session.data,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  // If the session might be undefined, use optional chaining or provide a default value
  const { session } = useLoaderData<typeof loader>() || {};

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='mx-auto max-w-xl p-4 lg:max-w-7xl'>
        <header>
          <div className='flex items-center justify-between lg:border-b lg:border-gray-800 lg:pt-1 lg:pb-5'>
            <p className='text-sm uppercase lg:text-lg'>
              <span className='text-gray-500'>Self</span>
              <span className='font-semibold text-gray-200'>Journal</span>
            </p>

            <div className='text-sm font-medium text-gray-500 hover:text-gray-200'>
              {session?.admin ? (
                <Form method='post'>
                  <button>Log out</button>
                </Form>
              ) : (
                <Link to='/login'>Log in</Link>
              )}
            </div>
          </div>

          <div className='my-20 lg:my-28'>
            <div className='text-center'>
              <h1 className='text-5xl font-semibold tracking-tighter text-white lg:text-7xl'>
                <Link to='/'>Work Journal</Link>
              </h1>

              <p className='mt-2 tracking-tight text-gray-500 lg:mt-4 lg:text-2xl'>
                Doings and learnings. Updated weekly.
              </p>
            </div>
          </div>
        </header>

        <main className='mx-auto max-w-3xl'>{children}</main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className='w-full flex flex-col items-center py-[10%]'>
        <h1 className='text-9xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 via-pink-300 bg-clip-text text-transparent w-min'>
          {error.status}
        </h1>
        <p className='text-gray-500 text-lg'>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
