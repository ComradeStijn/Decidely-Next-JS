"use client"

import { deleteCookie } from "../booth/actions"

export default function RedirectPage() {
  return (
    <div className="w-72 flex flex-col items-center space-y-10">
      <h1 className="text-center text-blue-700 text-2xl font-mono">User token has expired. <br />Please log-in again</h1>
      <button onClick={deleteCookie} className="text-center text-xl rounded bg-blue-700 text-white px-5 py-1 hover:text-blue-700 hover:bg-white hover:outline hover:outline-blue-700">Return to Login Screen</button>
    </div>
  )
}