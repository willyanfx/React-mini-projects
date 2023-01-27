import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";
export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export default function AuthPage() {
  return (
    <>
      <h1>Auth Page</h1>
      <AuthForm />
    </>
  );
}
