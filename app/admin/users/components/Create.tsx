"use client";

import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import CreateUserModal from "./CreateUserModal";

export default function Create() {
  const [groupOpen, setGroupOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false)
  const [deleteGroupOpen, setDeleteGroupOpen] = useState(false);

  function openGroup() {
    setGroupOpen(true);
  }

  function closeGroup() {
    setGroupOpen(false);
  }



  async function openDeleteGroup() {

    setDeleteGroupOpen(true);
  }

  function closeDeleteGroup() {
    setDeleteGroupOpen(false);
  }



  function openCreateUser() {
    setUserOpen(true)
  }

  function closeCreateUser() {
    setUserOpen(false)
  }

  return (
    <div className="mb-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {groupOpen && <CreateGroupModal closeModalAction={closeGroup} />}
      {deleteGroupOpen && <DeleteGroupModal closeModalAction={closeDeleteGroup} />}
      {userOpen && <CreateUserModal closeModalAction={closeCreateUser} />}
      <button
        className="rounded bg-blue-500 px-2 py-1 font-semibold text-gray-100 hover:bg-white hover:text-blue-500 hover:outline hover:outline-blue-500"
        onClick={openGroup}
      >
        Create Group
      </button>
      <button
        className="rounded bg-red-500 px-2 py-1 font-semibold text-gray-100 hover:bg-white hover:text-red-500 hover:outline hover:outline-red-500"
        onClick={openDeleteGroup}
      >
        Delete Group
      </button>
      <button onClick={openCreateUser} className="rounded bg-blue-500 px-2 py-1 font-semibold text-gray-100 hover:bg-white hover:text-blue-500 hover:outline hover:outline-blue-500">
        Create User
      </button>
    </div>
  );
}
