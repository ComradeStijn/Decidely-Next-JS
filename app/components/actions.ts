"use server";
import { cookies } from "next/headers";
import z from "zod";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { DecodedToken } from "../booth/page";

export type State = {
  message?: string,
  errors?: {
    amount?: string;
  };
};

type ProxyResponseBody = {
  success: boolean;
  message: number | string;
};

export async function voteOnForm(prevState: State, formData: FormData) {
  const formId = formData.get("formId");
  const formattedData: Record<string, string> = {};

  const authToken = (await cookies()).get("auth_token");

  let parsedProxyFetch: ProxyResponseBody;
  try {
    const proxyFetch = await fetch(
      "https://decidely-api.onrender.com/forms/proxy",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
      },
    );
    parsedProxyFetch = await proxyFetch.json();
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$") && key !== "formId") {
      formattedData[key] = isNaN(Number(value)) ? "0" : String(value);
    }
  }

  const parsedData = DecisionSchema.safeParse(formattedData);
  if (!parsedData.success) {
    throw new Error("Critical Failure to Parse Data in Server Action");
  }

  const castedVoteAmount = Object.values(parsedData.data).reduce(
    (acc, cur) => acc + cur,
  );
  if (castedVoteAmount !== parsedProxyFetch.message) {
    return {
      message: "Failure",
      errors: {
        amount: `You voted ${castedVoteAmount} times, but you have ${parsedProxyFetch.message} votes. Please try again`,
      },
    };
  }

  return {};
}

const DecisionSchema = z.record(z.string().transform((val) => Number(val)));
