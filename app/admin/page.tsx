import { DecodedToken } from "../booth/page";
import LogoutButton from "../components/LogoutButton";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

type Decision = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  formId: string;
  votes: number;
};

type Form = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  decisions: Decision[];
};

type FetchBody = {
  success: boolean;
  message: Form[] | string;
};

export default async function Page() {
  const cookie = await cookies();
  const token = cookie.get("auth_token");
  let fetchBody: FetchBody;

  if (!token?.value) {
    redirect("/");
  }

  const decodedToken = jwt.decode(token.value) as unknown as DecodedToken;
  if (decodedToken.role !== "admin") {
    redirect("/");
  }

  // try {
  //   const result = await fetch("https://decidely-api.onrender.com/admin/forms", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token.value}`
  //     }
  //   })
  //   fetchBody = await result.json()
  //   if (!fetchBody.success || typeof fetchBody === "string") {
  //     throw new Error(`Fetch Failed: ${fetchBody.message}`)
  //   }
  // } catch (e) {
  //   throw new Error(`Network error: ${e}`)
  // }
  // console.dir(fetchBody, {depth: null})

  fetchBody = {
    success: true,
    message: [
      {
        id: "38d94442-50ad-4f06-beac-28d5d4deb30f",
        title: "President",
        createdAt: new Date("2024-12-03T17:40:08.082Z"),
        updatedAt: new Date("2024-12-03T17:40:08.082Z"),
        decisions: [
          {
            id: "165efc97-3abf-4378-bd3a-8ff24369c796",
            title: "Koen Kockx",
            votes: 6,
            createdAt: new Date("2024-12-03T17:40:08.082Z"),
            updatedAt: new Date("2024-12-03T17:40:08.082Z"),
            formId: "38d94442-50ad-4f06-beac-28d5d4deb30f",
          },
          {
            id: "odshfuezhflkdc,oaij",
            title: "Kean Ooi",
            votes: 6,
            createdAt: new Date("2024-12-03T17:40:08.082Z"),
            updatedAt: new Date("2024-12-03T17:40:08.082Z"),
            formId: "38d94442-50ad-4f06-beac-28d5d4deb30f",
          },
          {
            id: "e82bf7e1-42e7-40da-b1c7-637345304236",
            title: "Wendy Dewit",
            votes: 15,
            createdAt: new Date("2024-12-03T17:40:08.082Z"),
            updatedAt: new Date("2024-12-03T17:40:08.082Z"),
            formId: "38d94442-50ad-4f06-beac-28d5d4deb30f",
          },
        ],
      },
      {
        id: "4211d4bb-108b-4775-a127-e43885fda28c",
        title: "Vice-President",
        createdAt: new Date("2024-12-03T17:40:08.082Z"),
        updatedAt: new Date("2024-12-03T17:40:08.082Z"),
        decisions: [
          {
            id: "765c14fe-b86d-4bc1-bb28-0589670274c2",
            title: "Stijn Servaes",
            votes: 9,
            createdAt: new Date("2024-12-03T17:40:08.082Z"),
            updatedAt: new Date("2024-12-03T17:40:08.082Z"),
            formId: "4211d4bb-108b-4775-a127-e43885fda28c",
          },
          {
            id: "ad8943ee-6b30-4233-a7e3-59b58e07a8ca",
            title: "Andreas Simons",
            votes: 18,
            createdAt: new Date("2024-12-03T17:40:08.082Z"),
            updatedAt: new Date("2024-12-03T17:40:08.082Z"),
            formId: "4211d4bb-108b-4775-a127-e43885fda28c",
          },
        ],
      },
    ],
  };

  return (
    <div className="w-[22rem] md:w-[40rem] lg:w-[60rem] lg:p-6 xl:w-[80rem]">
      <header>
        <div className="mb-5 flex flex-col items-center justify-between md:mb-10 md:flex-row">
          <h1 className="text-center text-3xl text-gray-800 lg:text-5xl">
            Admin Panel
          </h1>
          <div className="my-3 flex flex-col gap-5">
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="rounded-lg p-4">
        <table className="w-full table-auto text-left font-mono text-gray-700">
          <caption className="mb-2 text-xl font-semibold">
            Current results
          </caption>
          <colgroup>
            <col />
            <col />
          </colgroup>
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
              <td
                className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-center text-lg font-semibold"
                rowSpan={3}
              >
                President
              </td>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">
                Stijn Servaes
              </td>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">5</td>
            </tr>
            <tr>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">
                Kean Ooi
              </td>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">3</td>
            </tr>
            <tr>
              <td className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-right font-semibold">
                Total votes:
              </td>
              <td className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-sm font-semibold">
                8
              </td>
            </tr>
            <tr>
              <td
                className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-center text-lg font-semibold"
                rowSpan={4}
              >
                Vice-President
              </td>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">
                Stijn Servaes
              </td>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">5</td>
            </tr>
            <tr>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">
                Kean Ooi
              </td>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">3</td>
            </tr>
            <tr>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">
                Andreas Simons
              </td>
              <td className="border-b border-b-gray-200 bg-gray-100 p-2">2</td>
            </tr>
            <tr>
              <td className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-right font-semibold">
                Total votes:
              </td>
              <td className="border-b-4 border-b-gray-300 bg-gray-100 p-2 text-sm font-semibold">
                8
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

// {
//   success: true,
//   message: [
//     {
//       id: '38d94442-50ad-4f06-beac-28d5d4deb30f',
//       title: 'President',
//       createdAt: '2024-12-03T17:40:08.082Z',
//       updatedAt: '2024-12-03T17:40:08.082Z',
//       decisions: [
//         {
//           id: '165efc97-3abf-4378-bd3a-8ff24369c796',
//           title: 'Koen Kockx',
//           votes: 6,
//           createdAt: '2024-12-03T17:40:08.136Z',
//           updatedAt: '2024-12-04T23:20:15.019Z',
//           formId: '38d94442-50ad-4f06-beac-28d5d4deb30f'
//         },
//         {
//           id: 'odshfuezhflkdc,oaij',
//           title: 'Kean Ooi',
//           votes: 6,
//           createdAt: '2024-12-04T16:12:57.000Z',
//           updatedAt: '2024-12-04T23:20:15.019Z',
//           formId: '38d94442-50ad-4f06-beac-28d5d4deb30f'
//         },
//         {
//           id: 'e82bf7e1-42e7-40da-b1c7-637345304236',
//           title: 'Wendy Dewit',
//           votes: 15,
//           createdAt: '2024-12-03T17:40:08.136Z',
//           updatedAt: '2024-12-04T23:20:15.019Z',
//           formId: '38d94442-50ad-4f06-beac-28d5d4deb30f'
//         }
//       ]
//     },
//     {
//       id: '4211d4bb-108b-4775-a127-e43885fda28c',
//       title: 'Vice-President',
//       createdAt: '2024-12-03T17:43:41.762Z',
//       updatedAt: '2024-12-03T17:43:41.762Z',
//       decisions: [
//         {
//           id: '765c14fe-b86d-4bc1-bb28-0589670274c2',
//           title: 'Stijn Servaes',
//           votes: 9,
//           createdAt: '2024-12-03T17:43:41.783Z',
//           updatedAt: '2024-12-04T23:20:18.081Z',
//           formId: '4211d4bb-108b-4775-a127-e43885fda28c'
//         },
//         {
//           id: 'ad8943ee-6b30-4233-a7e3-59b58e07a8ca',
//           title: 'Andreas Simons',
//           votes: 18,
//           createdAt: '2024-12-03T17:43:41.783Z',
//           updatedAt: '2024-12-04T23:20:18.081Z',
//           formId: '4211d4bb-108b-4775-a127-e43885fda28c'
//         }
//       ]
//     }
//   ]
// }
