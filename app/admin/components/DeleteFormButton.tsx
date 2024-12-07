"use client";

import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { deleteForm } from "./actions";

export default function DeleteForm({formId}: {formId: string}) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  function openDelete() {
    setDeleteOpen(true);
  }

  function closeDelete() {
    setDeleteOpen(false);
  }

  return (
    <>
      {deleteOpen && <DeleteModal closeModalAction={closeDelete} formId={formId} />}
      <button onClick={openDelete} className="rounded px-2 py-1 font-bold text-red-500 outline outline-red-500 hover:text-red-700 hover:outline-red-700">
        Delete <br />
        Form
      </button>
    </>
  );
}


function DeleteModal({formId, closeModalAction}: {formId: string, closeModalAction: () => void}) {
  const [response, setResponse] = useState({error: false, message: ""})
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    setIsLoading(true);
    const success = await deleteForm(formId);
    setIsLoading(false);
    setResponse(success);

    if (!success.error) {
      closeModalAction();
    }
  }


  return (
    <div
      onClick={closeModalAction}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl bg-white p-4"
      >
        <h1 className="font-semibold">
          Are you sure you want to delete this user?
        </h1>

        {response.error && (
          <h2 className="mt-1 rounded bg-red-100 p-1 text-red-800">
            {response.message}
          </h2>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center my-2">
            <MoonLoader color="red" size={40} />
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              onClick={handleDelete}
              className="rounded bg-red-700 px-6 py-2 font-bold text-white hover:bg-white hover:text-red-700 hover:outline hover:outline-red-700"
            >
              Yes
            </button>
            <button
              onClick={closeModalAction}
              className="rounded bg-gray-200 px-6 py-2 font-semibold text-gray-600 hover:bg-gray-100 hover:outline hover:outline-gray-400"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  )
}