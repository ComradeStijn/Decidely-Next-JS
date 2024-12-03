"use client";

import { Form } from "../booth/page";
import { voteOnForm } from "./actions";
import { useActionState } from "react";
import { State } from "./actions";
import { MoonLoader } from "react-spinners";

export default function VoteForms({ form }: { form: Form }) {
  const [state, formAction, isPending] = useActionState(voteOnForm, {
    message: "",
    errors: {},
  } as State);

  if (isPending) {
    return (
      <article className="flex min-h-44 items-center justify-center p-4 shadow-md">
        <MoonLoader />
      </article>
    );
  }

  return (
    <form action={formAction} className="p-4 shadow-md">
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
  );
}
