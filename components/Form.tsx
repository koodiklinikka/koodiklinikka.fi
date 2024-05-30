'use client';

import { FormEvent, ReactNode, useState } from 'react';

const API_URL = 'https://koodiklinikka-api.fly.dev/invites';

export default function Form() {
  const [message, setMessage] = useState<ReactNode | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const data = await response.text();

    setIsSubmitting(false);

    if (response.status === 200) {
      setMessage('✅ Kutsu lähetetty antamaasi sähköpostiosoitteeseen.');
      return;
    }

    if (response.status === 400 && data === 'invalid_email') {
      setMessage('⚠️ Tarkasta syöttämäsi sähköpostiosoite');
      return;
    }

    if (response.status === 400 && data === 'already_invited') {
      setMessage('♻️ Sähköpostiosoitteeseen on jo lähetetty kutsu');
      return;
    }

    if (response.status === 400 && data === 'already_in_team') {
      setMessage(
        <span>
          🤔 Tällä sähköpostilla on jo luotu tunnus.{' '}
          <a href="https://koodiklinikka.slack.com/forgot" className="underline underline-offset-4">
            Nollaa unohtunut salasana
          </a>
          .
        </span>
      );
      return;
    }

    setMessage('⚡ Jotain meni pieleen. Yritä hetken päästä uudelleen.');
  }

  return (
    <div className="mx-auto w-full max-w-sm text-center md:max-w-xl">
      {message === null && (
        <form onSubmit={handleSubmit}>
          <h2 className="font-mono text-sm font-semibold">
            Syötä sähköpostiosoitteesi alle ja saat kutsun Slack-yhteisöömme:
          </h2>

          <div className="my-5 grid grid-cols-4 gap-2">
            <input
              type="email"
              name="email"
              required
              className="col-span-3 grow rounded px-3 py-2 text-sm text-fuchsia-950 sm:text-base md:rounded-lg md:px-4 md:py-4 lg:rounded-lg lg:px-5 lg:py-5 lg:text-lg"
              placeholder="minna.meikalainen@example.org"
              tabIndex={1}
            />
            <button
              tabIndex={3}
              type="submit"
              className="text-shadow bg-button rounded border border-pink-400 px-3 py-2 text-sm font-extrabold sm:text-base md:rounded-lg md:px-4 md:py-4 lg:px-5 lg:py-5 lg:text-lg"
            >
              {isSubmitting ? 'Liitytään' : 'Liity'}
            </button>
          </div>

          <label className="flex select-none flex-wrap items-center justify-center gap-2 font-mono text-xxs sm:text-xs">
            <div className="relative h-5 w-5">
              <input
                type="checkbox"
                name="terms"
                required
                className="h-3 w-3 opacity-5 focus:outline-none"
                tabIndex={2}
              />
              <div className="checkbox absolute left-0 top-0 flex h-full w-full items-center justify-center rounded border border-white bg-transparent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            Sitoudun yhteisön
            <a
              className="inline-flex items-center gap-1 underline underline-offset-4"
              href="https://github.com/koodiklinikka/code-of-conduct/blob/master/README.md"
              target="_blank"
            >
              <span>käyttäytymissääntöihin</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </label>
        </form>
      )}

      {message && (
        <div className="text-balance rounded-3xl bg-black/20 p-10 text-center font-mono text-sm backdrop-blur-sm">
          {message}
        </div>
      )}
    </div>
  );
}
