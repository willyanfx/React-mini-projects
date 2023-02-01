import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "../../data/expenses.server";

export async function loader() {
  const expenses = await getExpenses();

  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: "Could not find any expenses." },
  //     { status: 404, statusText: "No expense found" }
  //   );
  // }

  return expenses;
}

export default function ExpensesLayout() {
  const data = useLoaderData();

  const hasExpenses = data && data.length > 0;
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
        {hasExpenses && <ExpensesList expenses={data} />}
        {!hasExpenses && (
          <section>
            <h1>No expenses</h1>
            <p>
              Start <Link to='add'>adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}
