import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "~/styles/expenses.css";

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

export default function MarketingLayout() {
  return (
    <>
      <header>
        <ExpensesHeader />
      </header>
      <Outlet />
    </>
  );
}
