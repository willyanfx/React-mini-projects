import { useLoaderData } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";

export async function loader({ params }) {
  const id = params["id"];

  return id;
}

export default function UpdatePage() {
  const id = useLoaderData();
  return (
    <>
      <ExpenseForm />
    </>
  );
}
