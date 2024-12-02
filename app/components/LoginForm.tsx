import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export default function LoginForm() {
  return (
    <div className="w-96">
      <header className="mb-3 text-center lg:mb-10 lg:text-right">
        <h1 className="text-5xl font-bold tracking-tighter">Welcome to</h1>
        <h2 className="mb-4 text-center text-7xl">Decidely</h2>
        <p className="text-gray-600">An application by Stijn Servaes</p>
      </header>
      <form className="p-6">
        <h1 className="mb-6 text-center text-3xl font-extrabold">Log-in</h1>

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
            placeholder="Type your token..."
            required
          />
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
            required
          />
        </div>

        <button
          className="w-full rounded bg-blue-300 px-4 py-2 font-bold text-white hover:bg-white hover:text-blue-300 hover:outline hover:outline-2 hover:outline-blue-300"
          type="submit"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
