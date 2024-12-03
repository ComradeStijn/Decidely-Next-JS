"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function deleteCookie() {
  const cookie = await cookies()
  cookie.delete("auth_token")
  redirect("/")
}