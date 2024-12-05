import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import RedirectPage from "../components/RedirectPage";
import VoteForms from "../components/VoteForms";
import RefreshForm from "../components/RefreshForm";
import LogoutButton from "../components/LogoutButton";

export type DecodedToken = {
  sub: string;
  name: string;
  role: string;
  amount: number;
  iat: number;
  exp: number;
};

type FetchForm = {
  success: boolean;
  message: Form[];
  error?: string;
};

type FetchProxy = {
  success: boolean;
  message: number;
};

export type Form = {
  id: string;
  title: string;
  decisions: Decision[];
};

type Decision = {
  id: string;
  title: string;
};

export default async function Page() {
  const cookie = await cookies();
  const token = cookie.get("auth_token");
  if (!token?.value) {
    redirect("/");
  }
  const decodedToken = jwt.decode(token.value) as unknown as DecodedToken;
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > decodedToken.exp) {
    return <RedirectPage />;
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000))

  let forms: FetchForm;
  let proxyAmount: FetchProxy;
  let tooManyReq: boolean = false;
  try {
    const fetchForms = await fetch("https://decidely-api.onrender.com/forms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    forms = await fetchForms.json();
    
    if (forms.error?.includes("Too many requests")) {
      tooManyReq = true;
    }

    const fetchProxy = await fetch(
      "https://decidely-api.onrender.com/forms/proxy",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      },
    );
    proxyAmount = await fetchProxy.json();
  } catch (e) {
    throw new Error(`Network Error: ${e}`);
  }

  return (
    <div className="w-[18rem] md:w-[40rem] lg:w-[60rem] lg:p-6 xl:w-[80rem]">
      <div className="mb-5 flex flex-col items-center justify-between md:mb-10 md:flex-row">
        <div>
          <h1 className="text-center text-3xl lg:text-7xl">
            Welcome <strong>{decodedToken.name.split("_").join(" ")}</strong>
          </h1>
          <p className="text-gray-700 text-center md:text-left">Updated at: {(new Date()).toLocaleString("en-uk")}</p>
        </div>
        <div className="flex my-3 flex-col gap-5">
          <RefreshForm />
          <LogoutButton />
        </div>
      </div>
      {!Array.isArray(forms.message) ? (
        <div>
          <h1 className="text-4xl italic">
            {tooManyReq
              ? "Too many requests. Please wait."
              : "An unknown error has occurred while fetching forms."}
          </h1>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-4xl italic">
              {forms.message.length === 0
                ? "There are no forms to vote on."
                : ""}
            </h1>
          </div>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {forms.message.map((form) => (
              <VoteForms
                key={form.id}
                form={form}
                proxyAmount={proxyAmount.message}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// const test: FetchForm = {
//   success: true,
//   message: [
//     {
//       id: "2",
//       title: "Test",
//       decisions: [
//         {
//           id: "2dfq132",
//           title: "Decision 1"
//         },
//         {
//           id: "213dqfs3",
//           title: "Decision 133"
//         }
//       ]
//     },
//     {
//       id: "2333",
//       title: "Test",
//       decisions: [
//         {
//           id: "21aezr32",
//           title: "Decision 1"
//         },
//         {
//           id: "21gsq33",
//           title: "Decision 1"
//         }
//       ]
//     },
//     {
//       id: "244",
//       title: "Test",
//       decisions: [
//         {
//           id: "213aerazead2",
//           title: "Decision 123"
//         },
//         {
//           id: "21qdfzavfz33",
//           title: "Decision 142"
//         }
//       ]
//     },
//     {
//       id: "2qsdq",
//       title: "Test",
//       decisions: [
//         {
//           id: "21fdsqzef32",
//           title: "Decision 154"
//         },
//         {
//           id: "21vdqsqfsq33",
//           title: "Decision 112"
//         }
//       ]
//     },
//     {
//       id: "2sqd",
//       title: "Test",
//       decisions: [
//         {
//           id: "21qgsfc32",
//           title: "Decision 133"
//         },
//         {
//           id: "21azeazerarzae33",
//           title: "Decision 122"
//         }
//       ]
//     }
//   ]
// }
