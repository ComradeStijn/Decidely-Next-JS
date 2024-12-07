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
  const [selectedGroup, setSelectedGroup] = useState("");
  const [email, setEmail] = useState("");
  const [proxy, setProxy] = useState("1");
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

  useEffect(() => {
    if (state.success) {
      setName({ firstName: "", lastName: "" });
      setProxy("1");
      setEmail("");
    }
  }, [state]);

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
          <h1 className="text-3xl font-bold">Create User</h1>
          <button
            onClick={closeModalAction}
            className="text-xl font-bold text-gray-700"
          >
            X
          </button>
        </header>
        {isFetching ? (
          <div className="flex flex-col items-center justify-center">
            <MoonLoader />
            Fetching groups...
          </div>
        ) : isPending ? (
          <div className="my-6 flex items-center justify-center">
            <MoonLoader />
          </div>
        ) : groups.length === 0 ? (
          <h1>Create a group first.</h1>
        ) : (
          <>
            {!state.success && (
              <p className="mb-1 rounded bg-red-100 p-1 text-red-800">
                {state.message as string}
              </p>
            )}
            {error && (
              <p className="mb-1 rounded bg-red-100 p-1 text-red-800">
                {error as string}
              </p>
            )}
            {state.success && state.message && (
              <p className="mb-1 rounded bg-green-100 p-1 text-green-800">
                {state.message as string}
              </p>
            )}
            <form action={formAction} className="mt-6 flex flex-col gap-1">
              <label className="font-semibold text-gray-700" htmlFor="groupId">
                Group Name
              </label>
              <select
                name="groupId"
                id="groupId"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                required
                className="mb-4 w-full rounded bg-gray-100 p-2 font-bold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
              >
                {groups.map((group) => (
                  <option
                    key={group.id}
                    value={group.id}
                    className="text-gray-700"
                  >
                    {group.name}
                  </option>
                ))}
              </select>

              <label
                className="font-semibold text-gray-700"
                htmlFor="usernName"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={username}
                readOnly
                placeholder="John_Smith"
                className="rounded bg-gray-300 px-2 py-1 font-mono text-gray-700 outline outline-gray-300"
              />

              <label
                className="font-semibold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                required
                id="firstName"
                name="firstName"
                placeholder="John"
                type="text"
                value={name.firstName}
                className="rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
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

              <label className="font-semibold text-gray-700" htmlFor="lastName">
                Last Name
              </label>
              <input
                required
                id="lastName"
                name="lastName"
                placeholder="Smith"
                type="text"
                value={name.lastName}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
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
              <select
                className="mb-4 w-full rounded bg-gray-100 p-2 font-bold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
                required
                name="proxyAmount"
                id="proxyAmount"
                value={proxy}
                onChange={(e) => setProxy(e.target.value)}
              >
                <option className="text-gray-700" value="1">
                  1
                </option>
                <option className="text-gray-700" value="2">
                  2
                </option>
                <option className="text-gray-700" value="3">
                  3
                </option>
                <option className="text-gray-700" value="4">
                  4
                </option>
                <option className="text-gray-700" value="5">
                  5
                </option>
              </select>

              <label className="font-semibold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                type="email"
                id="email"
                name="email"
                placeholder="John@smith.org"
              />

              <label className="font-semibold text-gray-700" htmlFor="role">
                Role
              </label>
              <select
                className="mb-4 w-full rounded bg-gray-100 p-2 font-bold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
                required
                name="role"
                id="role"
              >
                <option className="text-gray-700" value="user">
                  User
                </option>
                <option className="text-gray-700" value="admin">
                  Admin
                </option>
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
