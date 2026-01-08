"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export async function signUp(email, password, name) {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  if (result?.user) {
    redirect("/dashboard");
  }

  return result;
}

export async function signIn(email, password) {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (result?.user) {
    redirect("/dashboard");
  }

  return result;
}

export async function signInSocial(provider) {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
    },
  });

  if (url) {
    redirect(url);
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/auth");
}
