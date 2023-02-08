import { requiredUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export async function loader({ request }) {
  await requiredUserSession(request);
  return getExpenses();
}
