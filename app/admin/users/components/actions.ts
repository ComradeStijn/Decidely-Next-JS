"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ResponseBody = {
  success: boolean;
  message: string | User;
};

type User = {
  name: string;
  id: string;
  email: string | null;
  token: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  proxyAmount: number;
  userGroupId: string | null;
};

export async function deleteUser(userId: string) {
  const authToken = (await cookies()).get("auth_token");

  let parsedDeleteFetch: ResponseBody;
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/users",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify({ userId: userId }),
      },
    );
    parsedDeleteFetch = await response.json();

    if (!parsedDeleteFetch.success) {
      return {
        error: true,
        message: parsedDeleteFetch.message as string,
      };
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  revalidatePath("/admin/users");
  return {
    error: false,
    message: "",
  };
}

export async function changeProxy(userId: string, newAmount: number) {
  const authToken = (await cookies()).get("auth_token");

  if (newAmount < 1 || newAmount > 5 || typeof newAmount !== "number") {
    throw new Error("New proxyAmount is not between 1 and 5");
  }

  let parsedModifyFetch: ResponseBody;
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/users/proxy",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify({ userId: userId, newAmount: newAmount }),
      },
    );
    parsedModifyFetch = await response.json();

    if (!parsedModifyFetch.success) {
      return {
        error: true,
        message: parsedModifyFetch.message as string,
      };
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  revalidatePath("/admin/users");
  return {
    error: false,
    message: "",
  };
}

export async function createGroup(
  prevState: CreateGroupState,
  formData: FormData,
) {
  const groupName = formData.get("groupName");
  const authToken = (await cookies()).get("auth_token");


  let createGroupFetch: CreateGroupBody;
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/groups",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify({ groupName: groupName }),
      },
    );
    createGroupFetch = await response.json();

    if (!createGroupFetch.success) {
      return {
        success: false,
        message: "Error creating group. Please check unique groupname",
      };
    }
  } catch (e) {
    throw new Error(`Network Error: ${e}`);
  }
  redirect("/admin/users")

  return {
    success: true,
    message: "",
  };
}

type CreateGroupBody = {
  success: boolean;
  message:
    | string
    | {
        name: string;
        id: string;
      };
};

export type CreateGroupState = {
  success: boolean;
  message: string;
};
