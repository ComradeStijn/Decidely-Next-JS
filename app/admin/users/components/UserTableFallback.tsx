import { MoonLoader } from "react-spinners";

export default async function UserTableFallback() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-left text-gray-700 shadow-lg brightness-75">
        <caption className="mb-2 text-xl font-semibold">Users</caption>
        <thead>
          <tr>
            <th className="rounded-tl-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Group
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Name
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Email
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Token
            </th>
            <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
              Proxies
            </th>
            <th className="rounded-tr-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans"></th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan={6} className="p-4 h-40 bg-gray-100">
            <div className="flex justify-center items-center">
              <MoonLoader />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}