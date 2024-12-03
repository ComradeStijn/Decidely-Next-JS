"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Please enter a username' }),  
  token: z.string().min(1, { message: 'Please enter a token' }),        
});

export async function postForm(prevState: State, formData: FormData) {
  const parsedData = loginSchema.safeParse({
    username: formData.get('username'),
    token: formData.get('token')
  })

  await new Promise((resolve) => setTimeout(resolve, 3000))

  if (!parsedData.success) {
    return{
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing fields. Failed to log-in"
    }
  }
  const cookie = await cookies()
  // cookie.set('auth_token', 'test', {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: true,
  // })
  
  throw new Error("Log in failed")

  redirect('/')
}

export type State = {
 errors?: {
  username?: string[],
  token?: string[]
 },
 message?: string
}