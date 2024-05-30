import Image from 'next/image';

export default function Footer() {
  return (
    <div className="space-y-10 pt-24 text-center">
      <div className="flex items-center justify-center gap-10 ">
        <a
          href="https://koodiklinikka.slack.com/"
          className="opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <Image className="size-8" width="800" height="800" src="/logos/slack.svg" alt="Koodiklinikka Slack" />
        </a>
        <a
          href="https://github.com/koodiklinikka"
          className="opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <Image className="size-8" width="98" height="96" src="/logos/github.svg" alt="Koodiklinikka GitHub" />
        </a>
        <a
          href="https://x.com/koodiklinikka"
          className="opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <Image className="size-8" width="300" height="300" src="/logos/x.svg" alt="Koodiklinikka X" />
        </a>

        <a
          href="https://www.facebook.com/koodiklinikka"
          className="opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <Image className="size-8" width="40" height="40" src="/logos/facebook.svg" alt="Koodiklinikka Facebook" />
        </a>
        <a
          href="https://www.linkedin.com/groups/12025476"
          className="opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <Image className="size-8" width="531" height="530" src="/logos/linkedin.svg" alt="Koodiklinikka LinkedIn" />
        </a>
      </div>
      <div>
        <a
          href="mailto:info@koodiklinikka.fi"
          className="font-mono text-xs opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          info@koodiklinikka.fi
        </a>
      </div>
    </div>
  );
}
