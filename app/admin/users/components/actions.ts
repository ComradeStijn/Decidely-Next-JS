"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

type UserResponseBody = {
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

type GroupResponseBody = {
  success: boolean;
  message: string | Group | null;
};

type CreateGroupBody = {
  success: boolean;
  message:
    | string
    | {
        name: string;
        id: string;
      };
};

export type CreateState = {
  success: boolean;
  message: string;
};

type FetchGroupsBody = {
  success: boolean;
  message: string | Group[];
};

export type Group = {
  name: string;
  id: string;
};

export async function deleteUser(userId: string) {
  const authToken = (await cookies()).get("auth_token");

  let parsedDeleteFetch: UserResponseBody;
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

export async function deleteGroup(groupId: string) {
  const authToken = (await cookies()).get("auth_token");

  let parsedDeleteGroup: GroupResponseBody;
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/groups",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify({ groupId: groupId }),
      },
    );
    parsedDeleteGroup = await response.json();

    if (!parsedDeleteGroup.success) {
      return {
        error: true,
        message: parsedDeleteGroup.message as string,
      };
    }

    if (parsedDeleteGroup.message === null) {
      return {
        error: true,
        message: "Cannot delete group. Group contains users.",
      };
    }

    return {
      error: false,
      message: "",
    };
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }
}

export async function changeProxy(userId: string, newAmount: number) {
  const authToken = (await cookies()).get("auth_token");

  if (newAmount < 1 || newAmount > 5 || typeof newAmount !== "number") {
    throw new Error("New proxyAmount is not between 1 and 5");
  }

  let parsedModifyFetch: UserResponseBody;
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

export async function createGroup(prevState: CreateState, formData: FormData) {
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

  redirect("/admin/users");

  return {
    success: true,
    message: "",
  };
}

export async function fetchGroups() {
  const authToken = (await cookies()).get("auth_token");

  let fetchGroups: FetchGroupsBody;
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/groups",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
      },
    );

    fetchGroups = await response.json();

    if (!fetchGroups.success) {
      return {
        error: true,
        message: fetchGroups.message as string,
      };
    }

    return {
      error: false,
      message: fetchGroups.message,
    };
  } catch (e) {
    throw new Error(`Network Error: ${e}`);
  }
}

export async function createUser(prevState: CreateState, formData: FormData) {
  const authToken = (await cookies()).get("auth_token");

  const formattedData = {
    userGroupId: formData.get("groupId"),
    userName: formData.get("userName"),
    amount: formData.get("proxyAmount"),
    role: formData.get("role"),
    email: formData.get("email"),
  };

  const parsedData = createUserSchema.safeParse(formattedData);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors
        .map((error) => `${error.message}`)
        .join(", "),
    };
  }

  let responseBody: UserResponseBody;
  try {
    const response = await fetch("https://decidely-api.onrender.com/admin/users", {
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
        message: "Failed to create user. Make sure user does not yet exist."
      }
    }

  } catch (e) {
    throw new Error(`Network error: ${e}`)
  }

  revalidatePath("/admin/users")
  return {
    success: true,
    message: "User created succesfully.",
  };
}

const createUserSchema = z.object({
  userGroupId: z.string(),
  userName: z.string().trim(),
  amount: z.coerce.number().int().min(1).max(5),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
});
