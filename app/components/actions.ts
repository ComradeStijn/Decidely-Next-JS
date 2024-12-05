"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

export type State = {
  message?: string;
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
  message: string;
};

// VoteForm.tsx
export async function voteOnForm(prevState: State, formData: FormData) {
  const formId = formData.get("formId");
  const formattedData: { decision: string; amount: number }[] = [];

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

    if (!parsedProxyFetch.success) {
      return {
        message: "Failure",
        errors: {
          amount: parsedProxyFetch.message as string,
        },
      };
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$") && key !== "formId") {
      formattedData.push({
        decision: key,
        amount: isNaN(Number(value)) ? 0 : Number(value),
      });
    }
  }

  const parsedData = DecisionArraySchema.safeParse(formattedData);
  if (!parsedData.success) {
    throw new Error("Critical Failure to Parse Data in Server Action");
  }

  const castedVoteAmount = parsedData.data.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
  if (castedVoteAmount !== parsedProxyFetch.message) {
    return {
      message: "Failure",
      errors: {
        amount: `You voted ${castedVoteAmount} times, but you have ${parsedProxyFetch.message} votes. Please try again`,
      },
    };
  }

  try {
    const response = await fetch(
      `https://decidely-api.onrender.com/forms/${formId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decisions: parsedData.data,
        }),
      },
    );
    const data: VoteResponseBody = await response.json();
    if (!data.success) {
      throw new Error(`Fetch error: ${data.message}`);
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  revalidatePath("/dashboard");
  return {};
}

const DecisionSchema = z.object({
  decision: z.string(),
  amount: z.number(),
});
const DecisionArraySchema = z.array(DecisionSchema);

// RefreshForm.tsx
export async function refreshForm() {
  revalidatePath("/dashboard");
}

export async function logout() {
  const cookie = await cookies();
  cookie.delete("auth_token");
}
