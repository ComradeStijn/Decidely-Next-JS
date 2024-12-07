import { MoonLoader } from "react-spinners";

export default async function FormTableFallback() {
  return (
    <table className="w-full table-auto text-left text-gray-700 brightness-75 shadow-lg">
      <caption className="mb-2 text-xl font-semibold">Current results</caption>
      <thead>
        <tr>
          <th className="rounded-tl-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 text-center font-sans">
            Form Title
          </th>
          <th className="border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
            Decisions
          </th>
          <th className="rounded-tr-lg border-b-4 border-b-gray-300 bg-gray-200 p-2 font-sans">
            Votes
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={3} className="p-4 h-40 bg-gray-100">
            <div className="flex justify-center items-center">
              <MoonLoader />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}