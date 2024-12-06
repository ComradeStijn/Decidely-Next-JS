"use client";

import { useState } from "react";
import CreateGroup from "./CreateGroup";

export default function Create() {
  const [groupOpen, setGroupOpen] = useState(false);

  function openGroup() {
    setGroupOpen(true)
  }

  function closeGroup() {
    setGroupOpen(false)
  }

  return (
    <div className="flex gap-3 mb-7">
      {groupOpen && <CreateGroup closeModalAction={closeGroup} />}
      <button className="bg-blue-500 py-1 px-2 rounded font-semibold text-gray-100 hover:text-blue-500 hover:outline hover:outline-blue-500 hover:bg-white" onClick={openGroup}>Create Group</button>
      <button className="bg-blue-500 py-1 px-2 rounded font-semibold text-gray-100 hover:text-blue-500 hover:outline hover:outline-blue-500 hover:bg-white">Delete Group</button>
      <button className="bg-blue-500 py-1 px-2 rounded font-semibold text-gray-100 hover:text-blue-500 hover:outline hover:outline-blue-500 hover:bg-white">Create User</button>
    </div>
  );
}
