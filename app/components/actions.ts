"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";


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

type VoteResponseBody = {
  success: boolean;
  message: string
}

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

  try {
    const response = await fetch(`https://decidely-api.onrender.com/forms/${formId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${authToken?.value}`,
        "Content-Type": "application/json"
      }
    })
    const data: VoteResponseBody = await response.json();
    console.log(data)

  } catch (e) {
    throw new Error(`Network error: ${e}`)
  }

  revalidatePath("/dashboard")

  return {};
}

const DecisionSchema = z.record(z.string().transform((val) => Number(val)));
