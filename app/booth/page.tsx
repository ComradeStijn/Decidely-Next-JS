import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import RedirectPage from "../components/RedirectPage"

type DecodedToken = {
  sub: string,
  name: string,
  role: string,
  iat: number,
  exp: number
}

async function checkExpiry(token: string) {
  const decodedToken = jwt.decode(token) as unknown as DecodedToken
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime > decodedToken.exp  
}



export default async function Page() {
  const cookie = await cookies()
  const token = cookie.get("auth_token")
  if (!token?.value) {
    redirect("/")
  }

  const isExpired = await checkExpiry(token.value)
  if (isExpired) {
    return <RedirectPage />
  }

  return (
    <div>Test</div>
  )
}

