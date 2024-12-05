"use client";

import { useState } from "react";
import { refreshForm } from "./actions";
import { MoonLoader } from "react-spinners";

export default function RefreshForm() {
  const [isDisabled, setIsDisabled] = useState(false)

  async function clickHandler() {
    setIsDisabled(true);  
    await refreshForm()
    setTimeout(() => setIsDisabled(false), 5000)
  }

  return (
    <button
      onClick={clickHandler}
      className="my-5 flex rounded-xl px-4 py-1 text-xl text-blue-950 outline outline-2 outline-blue-950 hover:bg-blue-950 hover:text-white hover:outline-none disabled:outline md:text-3xl disabled:bg-white disabled:outline-blue-950 disabled:outline-2 disabled:text-blue-950"
      disabled={isDisabled}
    >
        {isDisabled ? (
          <MoonLoader size={30} color="blue" />
        ) : (
          "Refresh Forms"
        )}
    </button>
  );
}
