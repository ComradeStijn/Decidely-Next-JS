"use client";

import { useState } from "react";
import { deleteUser } from "./actions";
import { MoonLoader } from "react-spinners";

export default function DeleteModal({
  userId,
  closeModalAction,
}: {
  userId: string;
  closeModalAction: () => void;
}) {
  const [response, setResponse] = useState({ error: false, message: "" });
  const [isLoading, setIsloading] = useState(false);

  async function handleDelete() {
    setIsloading(true);
    const success = await deleteUser(userId);
    setIsloading(false);
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
  );
}
