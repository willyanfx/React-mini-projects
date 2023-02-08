import { Outlet } from "@remix-run/react";
import mktStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";

export function links() {
  return [{ rel: "stylesheet", href: mktStyles }];
}

export function loader({ request }) {
  return getUserFromSession(request);
}

export default function ExpensesAppLayout() {
  return (
    <>
      <header>
        <MainHeader />
      </header>
      <Outlet />
    </>
  );
}
