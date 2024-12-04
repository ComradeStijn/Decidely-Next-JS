"use client"

import { MoonLoader } from "react-spinners"

export default function Loading() {
  return(
    <div className="w-48 flex-col flex justify-center items-center">
      <MoonLoader />
      <p className="text-xl font-semibold text-center mt-6">Forms are loading...</p>
    </div>
  )
}