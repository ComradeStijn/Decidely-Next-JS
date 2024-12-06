"use client";

import { useState } from "react";
import { Group, User } from "./UserTable";
import DeleteModal from "./DeleteModal";

export default function UserItem({
  user,
  group,
}: {
  user: User;
  group: Group;
}) {
  const [proxyEditable, setProxyEditable] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function openDelete() {
    setDeleteOpen(true);
  }

  function closeDelete() {
    setDeleteOpen(false);
  }

  return (
    <>
      {deleteOpen && (
        <tr>
          <td>
            {deleteOpen && (
              <DeleteModal userId={user.id} closeModalAction={closeDelete} />
            )}
          </td>
        </tr>
      )}
      <tr>
        <td className="border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          {group.name}
        </td>
        <td className="border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          {user.name}
        </td>
        <td className="border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          {user.email}
        </td>
        <td className="overflow-x-auto whitespace-nowrap border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          {user.token}
        </td>
        <td className="border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          {proxyEditable ? "" : `${user.proxyAmount}`}
        </td>
        <td className="border-b-2 border-b-gray-300 bg-gray-100 p-2 text-sm">
          <div className="flex gap-2">
            <button>Edit proxy</button>
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
