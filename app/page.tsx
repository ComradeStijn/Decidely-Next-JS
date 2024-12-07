import Image from "next/image";
import LoginForm from "./components/LoginForm";
import image from "../public/undraw_voting_nvu7.svg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { DecodedToken } from "./booth/page";

export default async function Page() {
  const cookie = await cookies();
  const isLoggedIn = cookie.get("auth_token");

  if (isLoggedIn && isLoggedIn.value) {
    const decodedToken = jwt.decode(
      isLoggedIn.value,
    ) as unknown as DecodedToken;
    switch (decodedToken.role) {
      case "user":
        redirect("/booth");
      case "admin":
        redirect("/admin");
      default:
        break;
    }
  }

  return (
    <div className="flex flex-row items-center space-x-10">
      <LoginForm />
      <div className="relative hidden size-[600px] lg:block">
        <Image src={image} fill={true} alt="Illustration" />
      </div>
    </div>
  );
}
