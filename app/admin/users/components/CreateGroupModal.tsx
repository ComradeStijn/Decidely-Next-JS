"use client";

import { useActionState } from "react";
import { createGroup } from "./actions";
import { MoonLoader } from "react-spinners";

export default function CreateGroupModal({
  closeModalAction,
}: {
  closeModalAction: () => void;
}) {
  const [state, formAction, isPending] = useActionState(createGroup, {
    success: true,
    message: "",
  });

  return (
    <div
      onClick={closeModalAction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-96 rounded-xl bg-white p-4"
      >
        <header className="mb-3 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create Group</h1>
          <button
            onClick={closeModalAction}
            className="text-xl font-bold text-gray-700"
          >
            X
          </button>
        </header>
        {isPending ? (
          <div className="my-6 flex w-80 items-center justify-center">
            <MoonLoader />
          </div>
        ) : (
          <>
            {!state.success && (
              <p className="mb-1 rounded bg-red-100 p-1 text-red-800">
                {state.message}
              </p>
            )}
            <form action={formAction} className="flex flex-col gap-1">
              <label
                htmlFor="groupName"
                className="font-semibold text-gray-700"
              >
                GROUP NAME*
              </label>
              <input
                name="groupName"
                id="groupName"
                required
                className="rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
                type="text"
              />
              <button className="mt-4 rounded bg-blue-500 px-4 py-1 font-extrabold text-white hover:bg-white hover:text-blue-500 hover:outline hover:outline-blue-500">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
