"use client";

import { useEffect, useState } from "react";
import { Group } from "../users/components/actions";
import { Form } from "./FormTable";
import { assignFormToGroup, fetchAssign } from "./actions";
import { MoonLoader } from "react-spinners";

export default function AssignFormModal({
  closeModalAction,
}: {
  closeModalAction: () => void;
}) {
  const [isFetching, setIsFetching] = useState(true);
  const [groups, setGroups] = useState([] as Group[]);
  const [forms, setForms] = useState([] as Form[]);
  const [error, setError] = useState(null as null | string);
  const [success, setSuccess] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedForm, setSelectedForm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAssign();
      if (response.error || typeof response.message === "string") {
        setError(response.message as string);
      } else {
        setGroups(response.message.groups as Group[]);
        setForms(response.message.forms as Form[]);

        if ((response.message.groups as Group[]).length > 0) {
          setSelectedGroup((response.message.groups[0] as Group).id);
        }
        if ((response.message.forms as Form[]).length > 0) {
          setSelectedForm((response.message.forms[0] as Form).id);
        }
      }

      setIsFetching(false);
    };

    fetchData();
  }, []);

  async function assignHandler() {
    setIsFetching(true)
    setError(null)
    setSuccess(false)
    const response = await assignFormToGroup(selectedForm, selectedGroup)
    if (response.error) {
      setError(response.message)
    } else {
      setSuccess(true)
    }

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
        <header className="mb-3 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Assign Form</h1>
          <button
            onClick={closeModalAction}
            className="text-xl font-bold text-gray-700"
          ></button>
        </header>
        <p className="text-sm text-gray-700">
          Note: Forms cannot be deassigned.
        </p>
        {error && (
          <h2 className="mb-1 rounded bg-red-100 p-1 text-red-800">{error}</h2>
        )}
        {success && (
          <h2 className="mb-1 rounded bg-green-100 p-1 text-green-800">Success</h2>
        )}
        {isFetching ? (
          <div className="flex flex-col items-center justify-center">
            <MoonLoader />
            Fetching forms and groups...
          </div>
        ) : groups.length === 0 ? (
          <h1>No groups to display.</h1>
        ) : forms.length === 0 ? (
          <h1>No forms to display.</h1>
        ) : (
          <>
            <label className="font-semibold text-gray-700" htmlFor="groups">
              Groups
            </label>
            <select
              id="groups"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="mb-4 w-full rounded bg-gray-100 p-2 font-bold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
            >
              {groups.map((group) => (
                <option
                  className="text-gray-700"
                  key={group.id}
                  value={group.id}
                >
                  {group.name}
                </option>
              ))}
            </select>

            <label className="font-semibold text-gray-700" htmlFor="forms">
              Forms
            </label>
            <select
              id="forms"
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="mb-4 w-full rounded bg-gray-100 p-2 font-bold text-gray-700 outline outline-gray-300 focus:outline-4 focus:outline-slate-700"
            >
              {forms.map((form) => (
                <option className="text-gray-700" key={form.id} value={form.id}>
                  {form.title}
                </option>
              ))}
            </select>

            <button onClick={assignHandler} className="mt-4 rounded bg-blue-500 px-4 py-1 font-extrabold text-white hover:bg-white hover:text-blue-500 hover:outline hover:outline-blue-500">
              Assign
            </button>
          </>
        )}
      </div>
    </div>
  );
}
