"use client";

import { Form } from "../booth/page";
import { voteOnForm } from "./actions";
import { useActionState, useState } from "react";
import { State } from "./actions";
import { MoonLoader } from "react-spinners";

export default function VoteForms({
  form,
  proxyAmount,
}: {
  form: Form;
  proxyAmount: number;
}) {
  const defaultFormValue: { [key: string]: number } = {};
  form.decisions.forEach((decision) => {
    defaultFormValue[decision.id] = 0;
  });

  const [vote, setVote] = useState(defaultFormValue);
  const remainingVotes = proxyAmount - Object.values(vote).reduce((acc, cur) => acc + cur);
  console.log("remainingVotes", remainingVotes)
  console.log("votes", vote)

  const handleSelectionChange = (decisionId: string, value: number) => {
    setVote((prevState) => ({
      ...prevState,
      [decisionId]: value,
    }));
  };

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

  const choicesNumberArray = Array.from(Array(proxyAmount + 1).keys());

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center rounded-xl bg-blue-700 px-10 py-6 shadow-2xl"
    >
      <h2 className="mb-4 text-center text-2xl font-semibold text-white">
        {form.title}
      </h2>
      {state.errors?.amount && (
        <p className="mb-2 rounded-lg bg-red-600 px-3 py-1 font-bold text-white shadow-2xl">
          {state.errors?.amount}
        </p>
      )}
      <input type="hidden" name="formId" value={form.id} />
      {form.decisions.map((decision) => (
        <fieldset
          key={decision.id}
          className="mb-5 flex flex-col justify-center"
        >
          <label
            className="mb-1 font-mono text-xl font-semibold text-white text-center"
            htmlFor={decision.id}
          >
            {decision.title}
          </label>

          <div className="flex gap-4">
            {choicesNumberArray.map((amount) => (
              <div
                key={`${decision.id}-${amount}`}
                className="flex items-center justify-center gap-2"
              >
                <input
                  type="radio"
                  id={`${decision.id}-${amount}`}
                  name={decision.title}
                  value={amount}
                  className="peer hidden"
                  onChange={() => handleSelectionChange(decision.id, amount)}
                  disabled={remainingVotes + vote[decision.id] < amount  && vote[decision.id] < amount}
                />
                <label
                  className="rounded-full px-3 py-1 text-xl text-white outline outline-1 hover:cursor-pointer peer-checked:bg-white peer-checked:font-bold peer-checked:text-blue-700 peer-disabled:bg-blue-700 peer-disabled:text-blue-700 peer-disabled:outline-none"
                  htmlFor={`${decision.id}-${amount}`}
                >
                  {amount}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
      <button
      className={`bg-yellow-500 self-stretch py-3 mt-1 text-blue-900 font-mono font-bold rounded-lg text-3xl
        hover:bg-blue-900 hover:text-yellow-500 hover:outline hover:outline-yellow-500 
        transition-opacity duration-300
        ${Boolean(remainingVotes) ? 'opacity-10 pointer-events-none' : 'opacity-100'}
      `}
      disabled={Boolean(remainingVotes)}
    >
      VOTE
    </button>
    </form>
  );
}
