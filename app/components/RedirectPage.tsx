"use client";

import { deleteCookie } from "../booth/actions";
import Image from "next/image";
import image from "../../public/undraw_not_found_re_bh2e.svg";

export default function RedirectPage() {
  return (
    <div className="flex w-72 flex-col items-center space-y-10 lg:w-[50rem] self-center">
      <Image src={image} alt="Not found"></Image>
      <h1 className="text-center font-mono text-2xl text-blue-700 lg:text-5xl">
        User token has expired. <br />
        Please log-in again
      </h1>
      <button
        onClick={deleteCookie}
        className="rounded bg-blue-700 px-5 py-1 text-center text-xl text-white hover:bg-white hover:text-blue-700 hover:outline hover:outline-blue-700 lg:text-2xl"
      >
        Return to Login Screen
      </button>
    </div>
  );
}
