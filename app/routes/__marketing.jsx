import { Outlet } from "@remix-run/react";
import mktStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";

export function links() {
  return [{ rel: "stylesheet", href: mktStyles }];
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
