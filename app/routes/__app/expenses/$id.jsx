import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export async function action({ params, request }) {
  const expenseId = params.id;

  console.log(request.method);

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    console.log(expenseData, expenseData);
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else {
    await deleteExpense(expenseId);
    return null;
  }
}

export default function UpdatePage() {
  const navigate = useNavigate();

  function closeHandler() {
    // nav programmatically
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}
