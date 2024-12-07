"use client";

import { useActionState, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { createForm } from "./actions";

export default function CreateFormModal({
  closeModalAction,
}: {
  closeModalAction: () => void;
}) {
  const [title, setTitle] = useState("");
  const [decisions, setDecisions] = useState(["", "", "", "", "", ""]);

  const [state, formAction, isPending] = useActionState(createForm, {
    success: true,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      setTitle("")
      setDecisions(["", "", "", "", "", ""])
    }
  }, [state])

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
          <h1 className="text-3xl font-bold">Create Form</h1>
          <button
            onClick={closeModalAction}
            className="text-xl font-bold text-gray-700"
          >
            X
          </button>
        </header>
        {isPending ? (
          <div className="my-6 flex items-center justify-center">
            <MoonLoader />
          </div>
        ) : (
          <>
            {!state.success && (
              <p className="mb-1 rounded bg-red-100 p-1 text-red-800">{state.message as string}</p>
            )}
            {state.success && state.message && (
              <p className="mb-1 rounded bg-green-100 p-1 text-green-800">{state.message as string}</p>
            )}
            <form action={formAction} className="mt-6 flex flex-col gap-1">
              <label className="font-semibold text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required
                id="title"
                name="title"
                placeholder="e.g. President"
                value={title}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
              />

              <label
                htmlFor="decision-1"
                className="font-semibold text-gray-700"
              >
                Decision 1*
              </label>
              <span className="text-sm text-gray-600 mt-[-0.5rem] font-mono">REQUIRED</span>
              <input
                onChange={(e) =>
                  setDecisions((prev) => [e.target.value, ...prev.slice(1)])
                }
                type="text"
                required
                id="decision-1"
                name="decision-1"
                placeholder="e.g. John Smith"
                value={decisions[0]}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
              />

              <label
                htmlFor="decision-2"
                className="font-semibold text-gray-700"
              >
                Decision 2*
              </label>
              <span className="text-sm text-gray-600 mt-[-0.5rem] font-mono">REQUIRED</span>
              <input
                onChange={(e) =>
                  setDecisions((prev) => [
                    ...prev.slice(0, 1),
                    e.target.value,
                    ...prev.slice(2),
                  ])
                }
                type="text"
                required
                id="decision-3"
                name="decision-3"
                placeholder="e.g. John Smith"
                value={decisions[1]}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
              />

              <label
                htmlFor="decision-3"
                className="font-semibold text-gray-700"
              >
                Decision 3
              </label>
              <input
                onChange={(e) =>
                  setDecisions((prev) => [
                    ...prev.slice(0, 2),
                    e.target.value,
                    ...prev.slice(3),
                  ])
                }
                type="text"
                id="decision-3"
                name="decision-3"
                placeholder="e.g. John Smith"
                value={decisions[2]}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
              />

              <label
                htmlFor="decision-4"
                className="font-semibold text-gray-700"
              >
                Decision 4
              </label>
              <input
                onChange={(e) =>
                  setDecisions((prev) => [
                    ...prev.slice(0, 3),
                    e.target.value,
                    ...prev.slice(4),
                  ])
                }
                type="text"
                id="decision-4"
                name="decision-4"
                placeholder="e.g. John Smith"
                value={decisions[3]}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
              />

              <label
                htmlFor="decision-5"
                className="font-semibold text-gray-700"
              >
                Decision 5
              </label>
              <input
                onChange={(e) =>
                  setDecisions((prev) => [
                    ...prev.slice(0, 4),
                    e.target.value,
                    ...prev.slice(5),
                  ])
                }
                type="text"
                id="decision-5"
                name="decision-5"
                placeholder="e.g. John Smith"
                value={decisions[4]}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
              />

              <label
                htmlFor="decision-6"
                className="font-semibold text-gray-700"
              >
                Decision 6
              </label>
              <input
                onChange={(e) =>
                  setDecisions((prev) => [
                    ...prev.slice(0, 5),
                    e.target.value,
                    ...prev.slice(6),
                  ])
                }
                type="text"
                id="decision-6"
                name="decision-6"
                placeholder="e.g. John Smith"
                value={decisions[5]}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
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
