"use client";

import { useState } from "react";
import CreateFormModal from "./CreateFormModal";
import AssignFormModal from "./AssignFormModal";

export default function Buttons() {
  const [formOpen, setFormOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false)

  function openForm() {
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
  }

  function openAssign() {
    setAssignOpen(true)
  }

  function closeAssign() {
    setAssignOpen(false)
  }

  return (
    <div className="mb-7 flex flex-wrap items-stretch justify-center gap-x-4 gap-y-3">
      {formOpen && <CreateFormModal closeModalAction={closeForm} />}
      {assignOpen && <AssignFormModal closeModalAction={closeAssign}/>}
      <button
        className="rounded bg-blue-500 px-2 py-1 font-semibold text-gray-100 hover:bg-white hover:text-blue-500 hover:outline hover:outline-blue-500"
        onClick={openForm}
      >
        Create Form
      </button>
      <button onClick={openAssign} className="rounded bg-blue-500 px-2 py-1 font-semibold text-gray-100 hover:bg-white hover:text-blue-500 hover:outline hover:outline-blue-500">
        Assign form <br />to Usergroup
      </button>
    </div>
  );
}
