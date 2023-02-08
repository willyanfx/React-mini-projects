import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import { requiredUserSession } from "~/data/auth.server";

export async function action({ request }) {
  const userId = await requiredUserSession(request);
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);

  return redirect("/expenses");
}

export default function AddPage() {
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
