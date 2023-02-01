import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import Error from "./components/util/Error";

import styles from "~/styles/shared.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Document({ title, children }) {
  return (
    <html lang='en'>
      <head>
        <title>{title}</title>
        <Meta />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const catchResponse = useCatch();

  return (
    <Document title={catchResponse.statusText}>
      <main>
        <Error title={catchResponse.statusText}>
          <p>{catchResponse.data?.message}</p>
          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}
export function ErrorBoundary({ error }) {
  return (
    <Document title='An error occured'>
      <main>
        <Error title='An error occured'>
          <p>{error.message}</p>
          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

export const meta = () => ({
  charset: "utf-8",
  title: "My Notes",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
