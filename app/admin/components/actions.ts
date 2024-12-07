"use server";

import { cookies } from "next/headers";
import { CreateState, FetchGroupsBody } from "../users/components/actions";
import z from "zod";
import { revalidatePath } from "next/cache";
import { FetchFormBody } from "./FormTable";

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

type AssignResponseBody = {
  success: boolean;
  message: string | GroupForm[]
}

type GroupForm = {
  groupId: string,
  formId: string
}

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

  let responseBody: FormResponseBody;
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/forms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify(parsedData.data),
      },
    );
    responseBody = await response.json();

    if (!responseBody.success || typeof responseBody.message === "string") {
      return {
        success: false,
        message:
          "Failed to create form. Make sure form title does not yet exist or decisions are unique.",
      };
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  revalidatePath("/admin");
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
  const authToken = (await cookies()).get("auth_token");

  let deleteFetch: FormResponseBody;
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/forms",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify({ formId: formId }),
      },
    );
    deleteFetch = await response.json();

    if (!deleteFetch.success) {
      return {
        error: true,
        message: "Could not delete form. Form might already have been deleted.",
      };
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  revalidatePath("/admin");
  return {
    error: false,
    message: "",
  };
}

export async function fetchAssign() {
  const authToken = (await cookies()).get("auth_token");

  let fetchGroups: FetchGroupsBody;
  let fetchForms: FetchFormBody;

  try {
    const responseGroup = await fetch(
      "https://decidely-api.onrender.com/admin/groups",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
      },
    );
    const responseForm = await fetch(
      "https://decidely-api.onrender.com/admin/forms",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
      },
    );

    fetchGroups = await responseGroup.json();
    fetchForms = await responseForm.json();

    if (!fetchGroups.success) {
      return {
        error: true,
        message: "Error fetching groups",
      };
    }
    if (!fetchForms.success) {
      return {
        error: true,
        message: "Error fetching forms",
      };
    }

    return {
      error: false,
      message: {
        groups: fetchGroups.message,
        forms: fetchForms.message,
      },
    };
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }
}

export async function assignFormToGroup(formId: string, groupId: string) {
  const authToken = (await cookies()).get("auth_token")

  let assignResponse: AssignResponseBody;
  try {
    const response = await fetch("https://decidely-api.onrender.com/admin/groups/assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.value}`,
      },
      body: JSON.stringify({
        formId: formId,
        groupId: groupId
      })
    })
    assignResponse = await response.json()

    if (!assignResponse.success) {
      return {
        error: true,
        message: "Error assigning form. Form might already have been assigned"
      }
    }

    return {
      error: false,
      message: ""
    }
  }  catch (e) {
    throw new Error(`Network error: ${e}`)
  }
}