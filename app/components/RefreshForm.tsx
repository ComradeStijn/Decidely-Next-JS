"use client";

import { useState } from "react";
import { refreshForm } from "./actions";
import { MoonLoader } from "react-spinners";

export default function RefreshForm() {
  const [isDisabled, setIsDisabled] = useState(false);

  async function clickHandler() {
    setIsDisabled(true);
    await refreshForm();
    setTimeout(() => setIsDisabled(false), 2000);
  }

  return (
    <button
      onClick={clickHandler}
      className="text-md flex justify-center items-center rounded-xl px-4 py-1 text-blue-950 outline outline-2 outline-blue-950 hover:bg-blue-950 hover:text-white hover:outline-none disabled:bg-white disabled:text-blue-950 disabled:outline disabled:outline-2 disabled:outline-blue-950 md:text-xl"
      disabled={isDisabled}
    >
      {isDisabled ? <MoonLoader size={20} color="blue" /> : "Refresh Forms"}
    </button>
  );
}
