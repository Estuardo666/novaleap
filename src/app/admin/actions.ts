"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Definimos las credenciales desde variables de entorno, o con valores por defecto.
const validEmail = process.env.ADMIN_EMAIL || "admin@novaleap.com";
const validPassword = process.env.ADMIN_PASSWORD || "admin";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === validEmail && password === validPassword) {
    cookies().set("novaleap_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Credenciales incorrectas" };
}

export async function logout() {
  cookies().delete("novaleap_admin_session");
  redirect("/admin/login");
}
