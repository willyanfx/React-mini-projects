import { useLoaderData, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export async function loader({ params }) {
  const id = params["id"];

  return id;
}

export default function UpdatePage() {
  const id = useLoaderData();
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
