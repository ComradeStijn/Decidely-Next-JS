import { DecodedToken } from "../booth/page";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import FormTable from "./components/FormTable";
import FormTableFallback from "./components/FormTableFallback";
import RedirectPage from "../components/RedirectPage";
import ButtonsForms from "./components/ButtonsForms";

export default async function Page() {
  const cookie = await cookies();
  const token = cookie.get("auth_token");

  if (!token?.value) {
    redirect("/");
  }

  const decodedToken = jwt.decode(token.value) as unknown as DecodedToken;
  if (decodedToken.role !== "admin") {
    redirect("/");
  }
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > decodedToken.exp) {
    return <RedirectPage />;
  }

  return (
    <main className="rounded-lg p-4">
      <ButtonsForms />
      <Suspense fallback={<FormTableFallback />}>
        <FormTable token={token} />
      </Suspense>
    </main>
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
