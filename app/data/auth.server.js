import { redirect } from "@remix-run/node";
import { hash, compare } from "bcryptjs";
import { prisma } from "./database.server";

function errorMessage(msg, code) {
  const error = new Error(msg);
  error.status = code;
  throw error;
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    errorMessage("A user with the provided email address exists already.", 422);
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: { email: email, password: passwordHash },
  });
  return redirect("/expenses");
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    errorMessage("Could not login you in.", 401);
  }

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    errorMessage("Could not login you in.", 401);
  }
}
