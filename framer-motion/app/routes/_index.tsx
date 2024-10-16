import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Framer-motion" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <div>home</div>;
}
