"use client";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useActionState } from "react";
import { State, postForm } from "../actions";
import { MoonLoader } from "react-spinners";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    postForm as (
      prevState: State,
      formData: FormData,
    ) => Promise<{
      errors: { username?: string[]; token?: string[]; fetch?: string };
    }>,
    { errors: {} } as State,
  );


  if (isPending) {
    return (
      <div className="h-[34rem] w-96 p-6">
        <header className="mb-3 text-center lg:mb-10 lg:text-right">
          <h1 className="text-5xl font-bold tracking-tighter">Welcome to</h1>
          <h2 className="mb-4 text-center text-7xl">Decidely</h2>
          <p className="text-gray-600">An application by Stijn Servaes</p>
        </header>
        <div className="flex h-[20rem] flex-col items-center justify-center">
          <MoonLoader color="blue" />
          <h1 className="font-mono">This can take a while...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[34rem] w-96 p-6">
      <header className="mb-3 text-center lg:mb-10 lg:text-right">
        <h1 className="text-5xl font-bold tracking-tighter">Welcome to</h1>
        <h2 className="mb-4 text-center text-7xl">Decidely</h2>
        <p className="text-gray-600">An application by Stijn Servaes</p>
      </header>

      <form action={formAction}>
        <h1 className="mb-6 text-center text-3xl font-extrabold">Log-in</h1>

        <div aria-live="polite" aria-atomic={true}>
          {state.errors?.fetch && (
            <p className="text-red-500">{state.errors.fetch}</p>
          )}
        </div>

        <label className="mb-1 block font-semibold" htmlFor="username">
          Username
        </label>
        <div className="relative mb-6 border-b-2">
          <UserCircleIcon className="absolute left-2 top-1.5 block size-5" />
          <input
            className="block w-full p-1 pl-8 placeholder-gray-500"
            type="text"
            name="username"
            id="username"
            placeholder="Type your username..."
            aria-describedby="username-error"
          />
        </div>
        <div id="username-error" aria-live="polite" aria-atomic="true">
          {state.errors?.username &&
            state.errors.username.map((error) => (
              <p key={error} className="mb-2 mt-[-1rem] text-red-500">
                {error}
              </p>
            ))}
        </div>

        <label className="mb-1 block font-semibold" htmlFor="token">
          Token
        </label>
        <div className="relative mb-6 border-b-2">
          <LockClosedIcon className="absolute left-2 top-1.5 block size-5" />
          <input
            className="block w-full p-1 pl-8 placeholder-gray-500"
            type="text"
            name="token"
            id="token"
            placeholder="Type your token..."
            aria-describedby="token-error"
          />
        </div>
        <div id="token-error" aria-live="polite" aria-atomic="true">
          {state.errors?.token &&
            state.errors.token.map((error) => (
              <p key={error} className="mb-2 mt-[-1rem] text-red-500">
                {error}
              </p>
            ))}
        </div>

        <button
          className="w-full rounded bg-blue-300 px-4 py-2 font-bold text-white hover:bg-white hover:text-blue-300 hover:outline hover:outline-2 hover:outline-blue-300"
          type="submit"
          disabled={isPending}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
