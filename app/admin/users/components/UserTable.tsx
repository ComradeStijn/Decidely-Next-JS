import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Download from "./Download";
import React from "react";
import UserItem from "./UserItem";

export type User = {
  id: string;
  name: string;
  email: string | null;
  token: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  proxyAmount: number;
  userGroupId: string;
};

export type Group = {
  id: string;
  name: string;
  users: User[];
};

export type FetchBody = {
  success: boolean;
  message: Group[] | string;
};

export default async function UserTable({ token }: { token: RequestCookie }) {
  let fetchBody: FetchBody;

  try {
    const result = await fetch(
      "https://decidely-api.onrender.com/admin/users",
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
      throw new Error(`Fetch Failed: ${fetchBody.message}`)
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }


  if (typeof fetchBody.message === "string") {
    throw new Error("Shouldnt see");
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-left text-gray-700 shadow-lg">
        <caption className="mb-2 text-xl font-semibold">Users</caption>
        <thead>
          <tr>
            <th className="rounded-tl-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Group
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Name
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Email
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Token
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Proxies
            </th>
            <th className="rounded-tr-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans"></th>
          </tr>
        </thead>
        <tbody>
          {fetchBody.message.map((group) =>
            group.users.map((user) => (
              <UserItem user={user} group={group} key={user.id} />
            )),
          )}
        </tbody>
      </table>
      <Download fetchBody={fetchBody} />
    </div>
  );
}

// {
//   success: true,
//   message: [
//     {
//       id: '0a06f89a-c675-4796-b766-f3181dc4a3eb',
//       name: 'Group',
//       users: [
//         {
//           id: '232542',
//           name: 'Stijn_Servaes',
//           email: null,
//           token: 'test',
//           role: 'user',
//           createdAt: '2024-12-03T14:10:43.000Z',
//           updatedAt: '2024-12-03T14:10:47.000Z',
//           proxyAmount: 3,
//           userGroupId: '0a06f89a-c675-4796-b766-f3181dc4a3eb'
//         }
//       ]
//     }
//   ]
// }
