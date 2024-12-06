"use client";
import { CSVLink } from "react-csv";
import { FetchBody, Group } from "./UserTable";
import Image from "next/image";
import icon from "@/public/csv.svg";
import { useEffect, useState } from "react";

export default function Download({ fetchBody }: { fetchBody: FetchBody }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
  }
  const flattenedData = flattenData(fetchBody.message as Group[]);

  if (!isClient) return null;

  return (
    <CSVLink
      data={flattenedData}
      filename="FormResult.csv"
      className="mt-6 flex w-max items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-1 text-sm text-gray-100"
    >
      Download
      <Image
        className="inline-block"
        src={icon}
        alt="csv-icon"
        height={15}
        width={15}
      />
    </CSVLink>
  );
}
