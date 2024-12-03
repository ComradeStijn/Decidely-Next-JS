"use server"
import { cookies } from "next/headers"
import z from "zod"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import { DecodedToken } from "../booth/page"

export async function voteOnForm(prevState: State, formData: FormData) {
  const formId = formData.get("formId")
  const formattedData: Record<string, string> = {}

  const authToken = (await cookies()).get("auth_token")
  if (!authToken || !authToken.value) redirect('/');
  const decodedToken = jwt.decode(authToken.value) as unknown as DecodedToken

  
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$") && key !== 'formId') {
      formattedData[key] = String(value)
    }
  }

  const parsedData = DecisionSchema.safeParse(formattedData)
  if (!parsedData.success) {
    throw new Error("Critical Failure to Parse Data in Server Action")
  }

  console.log(parsedData)

  return {}
}

const DecisionSchema = z.record(z.string().transform((val) => Number(val)))

export type State = {
  errors?: {
    amount?: string
  }
}