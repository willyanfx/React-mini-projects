import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { getExpenses } from "../../data/expenses.server";
import { json } from "@remix-run/node";
import Error from "~/components/util/Error";
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";

export async function loader() {
  const expenses = await getExpenses();

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "could not load expenses" },
      {
        status: 404,
        statusText: "Expenses not found",
      }
    );
  }

  return expenses;
}

export function CatchBoundary() {
  const response = useCatch();
  return (
    <main>
      ❗️❗️❗️❗️
      <Error title={response.statusText}>
        <p>{response.data?.message}</p>
      </Error>
    </main>
  );
}

export default function AnalysisPage() {
  const data = useLoaderData();

  return (
    <main>
      <Chart expenses={data} />
      <ExpenseStatistics expenses={data} />
    </main>
  );
}
