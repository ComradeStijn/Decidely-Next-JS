import Image from "next/image";
import LoginForm from "./components/LoginForm";
import image from "../public/undraw_voting_nvu7.svg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookie = await cookies()
  const isLoggedIn = cookie.has('auth_token')

  if (isLoggedIn) {
    redirect('/test')
  }

  return (
    <div className="flex items-center flex-row space-x-10">
      <LoginForm />
      <div className="relative hidden lg:block size-[600px]">
        <Image src={image} fill={true} alt="Illustration" />
      </div>
    </div>
  );
}
