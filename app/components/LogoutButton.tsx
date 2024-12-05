"use client";

import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { logout } from "./actions";

export default function LogoutButton() {
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleLogout() {
    setIsDisabled(true);
    await logout();
    setIsDisabled(false);
  }

  return (
    <button
      onClick={handleLogout}
      className="text-md flex items-center justify-center rounded-xl px-4 py-1 text-red-700 outline outline-2 outline-red-700 hover:bg-red-700 hover:text-white hover:outline-none disabled:bg-white disabled:text-red-700 disabled:outline disabled:outline-2 disabled:outline-red-700 md:text-xl"
      disabled={isDisabled}
    >
      {isDisabled ? <MoonLoader size={20} color="red" /> : "Logout"}
    </button>
  );
}
