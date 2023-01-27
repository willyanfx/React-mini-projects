import { Link, Outlet } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";

const DUMMY_EXPENSES = [
  { id: "e1", title: "First", amount: 12.99, date: new Date().toISOString() },
  { id: "e2", title: "Second", amount: 12.99, date: new Date().toISOString() },
];

export default function ExpensesLayout() {
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
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
