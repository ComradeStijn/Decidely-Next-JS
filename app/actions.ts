"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Please enter a username" }),
  token: z.string().min(1, { message: "Please enter a token" }),
});

type LoginResponseBody = {
  success: boolean;
  message:
    | string
    | {
        token: string;
      };
};

export async function postForm(prevState: State, formData: FormData) {
  const parsedData = loginSchema.safeParse({
    username: formData.get("username"),
    token: formData.get("token"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const payload = {
    userName: parsedData.data.username,
    token: parsedData.data.token,
  };

  try {
    const response = await fetch("https://decidely-api.onrender.com/login", {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: LoginResponseBody = await response.json();
    if (!data.success) {
      return {
        errors: {
          fetch:
            typeof data.message === "string" ? `Error ${response.status}: ${data.message}` : "Unknown error",
        },
      };
    }

    if (typeof data.message !== "string" && data.message.token) {
      const cookie = await cookies();
      cookie.set("auth_token", data.message.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        maxAge: 60 * 60 * 5
      });
    }
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }

  redirect("/");
}

export type State = {
  errors?: {
    username?: string[];
    token?: string[];
    fetch?: string;
  };
};
