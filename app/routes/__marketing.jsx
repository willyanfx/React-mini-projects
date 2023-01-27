import { Outlet } from "@remix-run/react";
import mktStyles from "~/styles/marketing.css";

export function links() {
  return [{ rel: "stylesheet", href: mktStyles }];
}

export default function ExpensesAppLayout() {
  return <Outlet />;
}
