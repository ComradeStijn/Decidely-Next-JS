"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type DeleteResponseBody = {
  success: boolean;
  message: string | DeletedUser
}

type DeletedUser = {
  name: string;
  id: string;
  email: string | null;
  token: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  proxyAmount: number;
  userGroupId: string | null;
}

export async function deleteUser(userId: string) {
  const authToken = (await cookies()).get("auth_token");

  let parsedDeleteFetch: DeleteResponseBody
  try {
    const response = await fetch(
      "https://decidely-api.onrender.com/admin/users",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken?.value}`,
        },
        body: JSON.stringify({userId: userId})
      },
    );
    parsedDeleteFetch = await response.json();

    if (!parsedDeleteFetch.success) {
      return {
        error: true,
        message: parsedDeleteFetch.message as string
      }
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }


  revalidatePath("/admin/users")
  return {
    error: false,
    message: ""
  }
}
