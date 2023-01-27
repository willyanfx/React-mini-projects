import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

export default function ExpensesAppLayout() {
  return <Outlet />;
}
