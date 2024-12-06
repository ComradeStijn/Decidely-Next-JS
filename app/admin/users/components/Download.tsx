"use client";
import { CSVLink } from "react-csv";
import { FetchBody, Group } from "./UserTable";

export default function Download({ fetchBody }: { fetchBody: FetchBody }) {
  function flattenData(message: Group[]) {
    return message.flatMap((group) =>
      group.users.map((user) => ({
        groupName: group.name,
        userName: user.name,
        userEmail: user.email,
        userToken: user.token,
        userProxyAmount: user.proxyAmount,
        userRole: user.role,
      })),
    );
  };
  const flattenedData = flattenData(fetchBody.message as Group[])

  return (
    <CSVLink data={flattenedData} >Download</CSVLink>
  )
}
