import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import RedirectPage from "../components/RedirectPage"
import VoteForms from "../components/VoteForms"

export type DecodedToken = {
  sub: string,
  name: string,
  role: string,
  amount: number,
  iat: number,
  exp: number
}

type FetchForm = {
  success: boolean,
  message: Form[]
}

export type Form = {
  id: string,
  title: string,
  decisions: Decision[]
}

type Decision = {
  id: string,
  title: string
}

export default async function Page() {
  const cookie = await cookies()
  const token = cookie.get("auth_token")
  if (!token?.value) {
    redirect("/")
  }
  const decodedToken = jwt.decode(token.value) as unknown as DecodedToken
  const currentTime = Math.floor(Date.now() / 1000)

  if (currentTime > decodedToken.exp) {
    return <RedirectPage />
  }

  // const fetchForms = await fetch("https://decidely-api.onrender.com/forms", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${token.value}`
  //   }
  // })
  // const forms: FetchForm = await fetchForms.json()

  // console.log(forms)


  return (
    <div className="w-[18rem] md:w-[40rem] lg:w-[60rem] xl:w-[80rem] lg:p-6">
      <h1 className="text-3xl lg:text-7xl mb-10">Welcome <strong>{decodedToken.name.split("_").join(" ")}</strong></h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {test.message.map((form) => (
          <VoteForms key={form.id} form={form} />
        ))}
      </div>
    </div>
  )
}

const test: FetchForm = {
  success: true,
  message: [
    {
      id: "2",
      title: "Test",
      decisions: [
        {
          id: "2dfq132",
          title: "Decision 1"
        },
        {
          id: "213dqfs3",
          title: "Decision 133"
        }
      ]
    },
    {
      id: "2333",
      title: "Test",
      decisions: [
        {
          id: "21aezr32",
          title: "Decision 1"
        },
        {
          id: "21gsq33",
          title: "Decision 1"
        }
      ]
    },
    {
      id: "244",
      title: "Test",
      decisions: [
        {
          id: "213aerazead2",
          title: "Decision 123"
        },
        {
          id: "21qdfzavfz33",
          title: "Decision 142"
        }
      ]
    },
    {
      id: "2qsdq",
      title: "Test",
      decisions: [
        {
          id: "21fdsqzef32",
          title: "Decision 154"
        },
        {
          id: "21vdqsqfsq33",
          title: "Decision 112"
        }
      ]
    },
    {
      id: "2sqd",
      title: "Test",
      decisions: [
        {
          id: "21qgsfc32",
          title: "Decision 133"
        },
        {
          id: "21azeazerarzae33",
          title: "Decision 122"
        }
      ]
    }
  ]
}