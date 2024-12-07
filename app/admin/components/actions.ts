"use server";

import { cookies } from "next/headers";
import { CreateState } from "../users/components/actions";
import z from "zod";
import { revalidatePath } from "next/cache";

type FormResponseBody = {
  success: boolean;
  message: string | Form;
};

type Decision = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  formId: string;
  title: string;
  votes: number;
};

type Form = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  decisions: Decision[];
};

export async function createForm(prevState: CreateState, formData: FormData) {
  const authToken = (await cookies()).get("auth_token");

  const formattedData: { title: string | null; decisions: string[] } = {
    title: formData.get("title") as string | null,
    decisions: [],
  };

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("decision") && value !== "") {
      formattedData.decisions.push(value as string);
    }
  }

  const parsedData = createFormSchema.safeParse(formattedData);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors
        .map((error) => `${error.message}`)
        .join(", "),
    };
  }

  let responseBody: FormResponseBody
  try {
    const response = await fetch("https://decidely-api.onrender.com/admin/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.value}`
      },
      body: JSON.stringify(parsedData.data)
    })
    responseBody = await response.json()

    if (!responseBody.success || typeof responseBody.message === "string") {
      return {
        success: false,
        message: "Failed to create form. Make sure form title does not yet exist."
      }
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`)
  }



  revalidatePath("/admin")
  return {
    success: true,
    message: "Form created",
  };
}

const createFormSchema = z.object({
  title: z.string().trim(),
  decisions: z.array(z.string()),
});

export async function deleteForm(formId: string) {
  const authToken = (await cookies()).get("auth_token")

  let deleteFetch: FormResponseBody;
  try {
    const response = await fetch("https://decidely-api.onrender.com/admin/forms", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.value}`
      },
      body: JSON.stringify({formId: formId})
    })
    deleteFetch = await response.json()

    if (!deleteFetch.success) {
      return {
        error: true,
        message: "Could not delete form. Form might already have been deleted."
      }
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`)
  }

  revalidatePath("/admin")
  return {
    error: false,
    message: ""
  }
}