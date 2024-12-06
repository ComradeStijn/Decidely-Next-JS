import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";
import Download from "./Download";

export type Decision = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  formId: string;
  votes: number;
};

export type Form = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  decisions: Decision[];
};

export type FetchBody = {
  success: boolean;
  message: Form[] | string;
};

export default async function FormTable({ token }: { token: RequestCookie }) {
  let fetchBody: FetchBody;

  try {
    const result = await fetch(
      "https://decidely-api.onrender.com/admin/forms",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      },
    );
    fetchBody = await result.json();
    if (!fetchBody.success || typeof fetchBody.message === "string") {
      throw new Error(`Fetch Failed: ${fetchBody.message}`);
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  return (
    <div>
      <table className="w-full table-auto text-left text-gray-700 shadow-lg">
        <caption className="mb-2 text-xl font-semibold">
          Current results
        </caption>
        <thead>
          <tr>
            <th className="rounded-tl-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 text-center font-sans">
              Form Title
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Decisions
            </th>
            <th className="rounded-tr-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Votes
            </th>
          </tr>
        </thead>
        <tbody>
          {fetchBody.message.map((form) => {
            let maxVotes = Math.max(
              ...form.decisions.map((decision) => decision.votes),
            );
            if (maxVotes === 0) {
              maxVotes = 9999;
            }

            return (
              <React.Fragment key={form.id}>
                <tr>
                  <td
                    rowSpan={form.decisions.length + 1}
                    className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-center text-lg font-semibold"
                  >
                    {form.title}
                  </td>
                  <td
                    className={`border-b border-b-gray-200 bg-gray-100 p-2 ${form.decisions[0].votes === maxVotes ? "font-bold" : ""}`}
                  >
                    {form.decisions[0].title}
                  </td>
                  <td
                    className={`border-b border-b-gray-200 bg-gray-100 p-2 ${form.decisions[0].votes === maxVotes ? "font-bold" : ""}`}
                  >
                    {form.decisions[0].votes}
                  </td>
                </tr>
                {form.decisions.slice(1).map((decision) => (
                  <tr key={decision.id}>
                    <td
                      className={`border-b border-b-gray-200 bg-gray-100 p-2 ${decision.votes === maxVotes ? "font-bold" : ""}`}
                    >
                      {decision.title}
                    </td>
                    <td
                      className={`border-b border-b-gray-200 bg-gray-100 p-2 ${decision.votes === maxVotes ? "font-bold" : ""}`}
                    >
                      {decision.votes}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-right font-semibold">
                    Total votes:
                  </td>
                  <td className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-sm font-semibold">
                    {form.decisions.reduce((acc, curr) => acc + curr.votes, 0)}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <Download fetchBody={fetchBody} />
    </div>
  );
}
