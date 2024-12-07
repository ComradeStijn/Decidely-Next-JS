"use client";

import { useState } from "react";
import { Group, User } from "./UserTable";
import DeleteUserModal from "./DeleteUserModal";
import { MoonLoader } from "react-spinners";
import { changeProxy } from "./actions";

export default function UserItem({
  user,
  group,
}: {
  user: User;
  group: Group;
}) {
  const [proxyAmount, setProxyAmount] = useState(user.proxyAmount);
  const [proxyEditable, setProxyEditable] = useState(false);
  const [isProxyFetching, setIsProxyFetching] = useState(false)

  const [deleteOpen, setDeleteOpen] = useState(false);

  function openDelete() {
    setDeleteOpen(true);
  }

  function closeDelete() {
    setDeleteOpen(false);
  }

  function openProxy() {
    setProxyEditable(true);
  }

  async function submitProxy() {
    if (proxyAmount !== user.proxyAmount) {
      setIsProxyFetching(true)
      const success = await changeProxy(user.id, proxyAmount)
      setIsProxyFetching(false)
      if (success.error) {
        throw new Error(success.message)
      }
    }
    setProxyEditable(false);
  }

  return (
    <>
      {deleteOpen && (
        <tr>
          <td>
            {deleteOpen && (
              <DeleteUserModal userId={user.id} closeModalAction={closeDelete} />
            )}
          </td>
        </tr>
      )}
      <tr>
        <td className="overflow-x-auto border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm ">
          {group.name}
        </td>
        <td className="overflow-x-auto border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm ">
          {user.name}
        </td>
        <td className="overflow-x-auto border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm ">
          {user.email}
        </td>
        <td className="border-x-2 overflow-x-auto text-wrap break-words max-w-[20ch] border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          {user.token}
        </td>
        <td className="border-b-2 border-b-gray-300 bg-gray-100 p-2">
          <select
            onChange={(e) => setProxyAmount(Number(e.target.value))}
            disabled={!proxyEditable}
            value={proxyAmount}
            className={
              `transition-transform ${proxyEditable ? "scale-125 font-bold" : "appearance-none p-1"}`
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        <td className="h-14 border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          <div className="flex flex-col justify-between gap-4">
            {proxyEditable ? (
              <button
                onClick={submitProxy}
                disabled={isProxyFetching}
                className="rounded flex justify-center items-center px-2 py-1 text-xs font-bold text-blue-500 outline outline-blue-500 hover:text-blue-800 hover:outline-blue-800"
              >
                {isProxyFetching ? <MoonLoader color="blue" size={15} /> : "✔"}
              </button>
            ) : (
              <button
                onClick={openProxy}
                className="rounded px-2 py-1 text-xs font-bold text-blue-500 outline outline-blue-500 hover:text-blue-800 hover:outline-blue-800"
              >
                Edit Proxy
              </button>
            )}
            {user.name !== "admin" && (
              <button
                onClick={openDelete}
                className="rounded px-2 py-1 text-xs font-bold text-red-500 outline outline-red-500 hover:text-red-700 hover:outline-red-700"
              >
                Delete User
              </button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
