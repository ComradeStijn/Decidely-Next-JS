"use client"

import { useState } from "react"
import CreateFormModal from "./CreateFormModal"

export default function Buttons() {
  const [formOpen, setFormOpen] = useState(false)

  function openForm() {
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
  }

  return (
    <div className="mb-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {formOpen && <CreateFormModal closeModalAction={closeForm} />}
      <button
        className="rounded bg-blue-500 px-2 py-1 font-semibold text-gray-100 hover:bg-white hover:text-blue-500 hover:outline hover:outline-blue-500"
        onClick={openForm}
      >
        Create Form
      </button>
    </div>
  )
}