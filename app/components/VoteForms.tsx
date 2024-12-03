"use client";

import { Form } from "../booth/page";
import { voteOnForm } from "./actions";
import { useActionState } from "react";
import { State } from "./actions"

export default function VoteForms({ form }: { form: Form }) {
  const [state, formAction, isPending] = useActionState(voteOnForm, {errors: {}} as State)

  return (
    <form action={formAction} className="shadow-md p-4">
      <h2 className="text-xl font-semibold">{form.title}</h2>
      <input type="hidden" name="formId" value={form.id} />
      {form.decisions.map((decision) => (
        <fieldset key={decision.id}>
          <label htmlFor={decision.id}>{decision.title}</label>
          <input type="text" id={decision.id} name={decision.title} />
        </fieldset>
      ))}
      <button>Vote</button>
    </form>
  )
}
