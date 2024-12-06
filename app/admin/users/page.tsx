import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation";
import RedirectPage from "@/app/components/RedirectPage";
import { DecodedToken } from "@/app/booth/page";
import { Suspense } from "react";
import UserTable from "./components/UserTable";
import UserTableFallback from "./components/UserTableFallback";

export default async function Page() {  
  const cookie = await cookies();
  const token = cookie.get("auth_token");

  if (!token?.value) {
    redirect("/");
  }

  const decodedToken = jwt.decode(token.value) as unknown as DecodedToken;
  if (decodedToken.role !== "admin") {
    redirect("/");
  }
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > decodedToken.exp) {
    return <RedirectPage />;
  }

  return (
    <main className="rounded-lg p-4">
      <Suspense fallback={<UserTableFallback />}>
        <UserTable token={token} />
      </Suspense>
    </main>
  )
}