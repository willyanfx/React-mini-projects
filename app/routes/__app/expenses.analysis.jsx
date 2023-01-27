import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

const DUMMY_EXPENSES = [
  { id: "e1", title: "First", amount: 12.99, date: new Date().toISOString() },
  { id: "e2", title: "Second", amount: 12.99, date: new Date().toISOString() },
];

export default function AnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
