import { Outlet } from "@remix-run/react";

export default function ExpensesLayout() {
  return (
    <div>
      <h1>Expense</h1>
      <Outlet />
    </div>
  );
}
