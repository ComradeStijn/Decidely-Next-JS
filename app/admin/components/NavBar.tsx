"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center">
      <button
        className={`rounded px-4 py-1 font-semibold ${pathname === "/admin" ? "text-lg text-gray-700 underline underline-offset-4" : "text-gray-400 transition-transform hover:scale-110 hover:text-gray-700"}`}
      >
        <Link href="/admin">Results</Link>
      </button>
      <button
        className={`rounded px-4 py-1 font-semibold ${pathname === "/admin/users" ? "text-lg text-gray-700 underline underline-offset-4" : "text-gray-400 transition-transform hover:scale-110 hover:text-gray-700"}`}
      >
        <Link href="/admin/users">Users</Link>
      </button>
    </nav>
  );
}
