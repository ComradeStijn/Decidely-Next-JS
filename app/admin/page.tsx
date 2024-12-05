import { DecodedToken } from "../booth/page";
import LogoutButton from "../components/LogoutButton";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

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

  return (
    <div className="w-[18rem] md:w-[40rem] lg:w-[60rem] lg:p-6 xl:w-[80rem]">
      <header>
        <div className="mb-5 flex flex-col items-center justify-between md:mb-10 md:flex-row">
          <h1 className="text-center text-3xl lg:text-5xl">Admin Panel</h1>
          <div className="my-3 flex flex-col gap-5">
            <LogoutButton />
          </div>
        </div>
      </header>
    </div>
  );
}
