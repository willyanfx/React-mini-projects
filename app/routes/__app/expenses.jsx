import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "../../data/expenses.server";

export async function loader() {
  return getExpenses();
}

export default function ExpensesLayout() {
  const data = useLoaderData();
  return (
    <>
      <Outlet />
      <main>
        <section id='expenses-actions'>
          <Link to='add'>
            <FaPlus />
            <span>Add Expenses</span>
          </Link>
          <a target='_blank' rel='noopener noreferrer' href='/expenses/raw'>
            <FaDownload />
            <span>Raw Expenses</span>
          </a>
        </section>
        <ExpensesList expenses={data} />
      </main>
    </>
  );
}
