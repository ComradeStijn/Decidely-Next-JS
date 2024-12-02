import Image from "next/image";
import LoginForm from "./components/LoginForm";
import image from "../public/undraw_voting_nvu7.svg";

export default function Page() {
  return (
    <div className="flex items-center flex-row">
      <LoginForm />
      <div className="relative hidden lg:block size-[600px]">
        <Image src={image} fill={true} alt="Illustration" />
      </div>
    </div>
  );
}
