"use client";

import { CSVLink } from "react-csv";
import { FetchBody, Form } from "./FormTable";
import Image from "next/image";
import icon from "@/public/csv.svg";
import { useEffect, useState } from "react";

export default function Download({ fetchBody }: { fetchBody: FetchBody }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  function flattenData(message: Form[]) {
    return message.flatMap((form) =>
      form.decisions.map((decision) => ({
        formTitle: form.title,
        formDecision: decision.title,
        decisionVotes: decision.votes,
      })),
    );
  }

  const flattenedData = flattenData(fetchBody.message as Form[]);

  if (!isClient) return null;

  return (
    <CSVLink data={flattenedData} filename="FormResult.csv" className="flex gap-2 w-max items-center text-sm justify-center py-1 px-4 rounded-2xl text-gray-100 mt-6 bg-blue-600">
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
