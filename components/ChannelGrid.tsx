import shuffle from 'lodash.shuffle';

const DELAYS = shuffle([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1]);

export default function ChannelGrid({ channels }: { channels: Channel[] }) {
  return (
    <div className="mt-8 grid gap-3 rounded-3xl border-t border-t-pink-100/10 bg-gradient-to-b from-black/10 to-black/0 p-6 backdrop-blur-sm xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:p-12">
      {channels.map((channel, i) => (
        <div key={channel.id} className="relative h-[5.5rem]">
          <div
            className="fade-in-out absolute bottom-0 left-0 right-0 top-0 z-0 rounded-[9px] bg-fuchsia-200/40"
            style={{
              WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
              animationDelay: `${DELAYS[i] * 2}s`,
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 top-0 z-10 m-px rounded-[8px] bg-[#2c0c33]"
            style={{ WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,0))' }}
          ></div>
          <div className="relative z-20 flex flex-col items-center justify-center gap-1 px-3 py-6 font-mono">
            <a
              href={`https://app.slack.com/client/T03BQ3NU9/${channel.id}`}
              target="_blank"
              className="text-sm font-semibold underline-offset-4 hover:underline"
            >{`#${channel.name}`}</a>
            <div className="text-xs opacity-70">{channel.num_members} jäsentä</div>
          </div>
        </div>
      ))}
    </div>
  );
}
