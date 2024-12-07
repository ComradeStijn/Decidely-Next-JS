"use client";

import { useActionState, useEffect, useState } from "react";
import { createUser, fetchGroups, Group } from "./actions";
import { MoonLoader } from "react-spinners";

export default function CreateUserModal({
  closeModalAction,
}: {
  closeModalAction: () => void;
}) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null as null | string);
  const [groups, setGroups] = useState([] as Group[]);
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });
  let username = "";

  const [state, formAction, isPending] = useActionState(createUser, {
    success: true,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGroups();
      if (response.error || typeof response.message === "string") {
        setError(response.message as string);
      } else {
        setGroups(response.message);
      }

      setIsFetching(false);
    };

    fetchData();
  }, []);

  if (name.firstName && name.lastName) {
    username = `${name.firstName}_${name.lastName}`;
  }

  return (
    <div
      onClick={closeModalAction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-96 rounded-xl bg-white p-4"
      >
        <h1 className="mb-3 text-3xl font-bold">Create User</h1>
        {isFetching ? (
          <div className="flex flex-col items-center justify-center">
            <MoonLoader />
            Fetching groups...
          </div>
        ) : isPending ? (
          <div>Pending</div>
        ) : groups.length === 0 ? (
          <h1>Create a group first.</h1>
        ) : (
          <>
            <form action={formAction} className="flex flex-col gap-1">
              <label className="font-semibold text-gray-700" htmlFor="group">
                Group Name:
              </label>
              <select name="group" id="group">
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>

              <label className="font-semibold text-gray-700" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                readOnly
              />

              <label
                className="font-semibold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={name.firstName}
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) =>
                  setName((prev) => ({
                    ...prev,
                    firstName: e.target.value.replace(/\s/g, ""),
                  }))
                }
              />

              <label className="font-semibold text-gray-700" htmlFor="">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={name.lastName}
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) =>
                  setName((prev) => ({
                    ...prev,
                    lastName: e.target.value.replace(/\s/g, ""),
                  }))
                }
              />

              <label
                className="font-semibold text-gray-700"
                htmlFor="proxyAmount"
              >
                Proxies
              </label>
              <select name="proxyAmount" id="proxyAmount">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <label className="font-semibold text-gray-700" htmlFor="">
                Email
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                type="email"
              />

              <label className="font-semibold text-gray-700" htmlFor="">
                Role
              </label>
              <select name="role" id="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

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
