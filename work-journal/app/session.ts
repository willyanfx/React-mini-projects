import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "sessao-jornal-de-trabalho",
      secrets: ["secret-legacy"],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  });
