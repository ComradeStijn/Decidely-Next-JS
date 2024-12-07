"use client";

import { useEffect, useState } from "react";
import { deleteGroup, fetchGroups, Group } from "./actions";
import { MoonLoader } from "react-spinners";

export default function DeleteGroupModal({
  closeModalAction,
}: {
  closeModalAction: () => void;
}) {
  const [isFetching, setIsFetching] = useState(true);
  const [groups, setGroups] = useState([] as Group[]);
  const [error, setError] = useState(null as null | string);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGroups();
      if (response.error || typeof response.message === "string") {
        setError(response.message as string);
      } else {
        setGroups(response.message);
        setSelectedGroup(response.message[0].id)
      }

      setIsFetching(false);
    };

    fetchData();
  }, [refetch]);

  async function deleteHandler() {
    setIsFetching(true)
    setError(null)
    const response = await deleteGroup(selectedGroup)
    if (response.error) {
      setError(response.message)
    }

    setRefetch((prev) => !prev)
    setIsFetching(false)
  }

  return (
    <div
      onClick={closeModalAction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-96 flex-col gap-2 rounded-xl bg-white p-4"
      >
        <h1 className="mb-3 text-3xl font-bold">Delete Group</h1>
        {error && (
          <h2 className="mb-1 rounded bg-red-100 p-1 text-red-800">{error}</h2>
        )}
        {isFetching ? (
          <div className="flex flex-col items-center justify-center">
            <MoonLoader />
            Fetching groups...
          </div>
        ) : groups.length === 0 ? (
          <h1>No groups to display.</h1>
        ) : (
          <>
            <select
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full rounded p-2 font-bold outline outline-gray-300 text-gray-700"
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id} className="text-gray-700">
                  {group.name}
                </option>
              ))}
            </select>
            <button
              onClick={deleteHandler}
              className="mt-3 rounded bg-red-600 px-3 py-1 text-gray-100 hover:bg-gray-100 hover:text-red-600 hover:outline hover:outline-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
