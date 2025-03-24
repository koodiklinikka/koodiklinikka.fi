import shuffle from 'lodash.shuffle';

import ChannelGrid from '@/components/ChannelGrid';
import FeatureImage from '@/components/FeatureImage';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Nav from '@/components/Nav';
import Wrapper from '@/components/Wrapper';

async function getChannels() {
  const res = await fetch('https://stats.koodiklinikka.fi/api/channels', { next: { revalidate: 3600 } });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  let channels: Channel[] = await getChannels();
  channels = channels.sort((a, b) => (a.messages_today > b.messages_today ? -1 : 1));

  return (
    <>
      <Nav />
      <main className="mt-20">
        <Wrapper>
          <Hero />

          <div className="text-shadow py-16 lg:my-24">
            <h2 className="mx-auto max-w-(--breakpoint-xs) text-center text-2xl font-extrabold md:max-w-none md:text-3xl">
              Suosituimmat keskustelunaiheet tänään
            </h2>

            <ChannelGrid channels={channels.splice(0, 12)} />

            <div className="mx-auto max-w-md p-6 text-center font-mono text-sm leading-relaxed text-fuchsia-100/60 lg:max-w-3xl">
              Ja paljon muuta:{' '}
              {shuffle(channels.splice(0, 20))
                .map<React.ReactNode>((channel) => (
                  <a
                    key={channel.id}
                    href={`https://app.slack.com/client/T03BQ3NU9/${channel.id}`}
                    target="_blank"
                    className="underline-offset-4 hover:underline"
                  >
                    #{channel.name}
                  </a>
                ))
                .reduce((prev, curr) => [prev, ', ', curr])}
              …
            </div>
          </div>

          <div className="mx-auto max-w-lg space-y-14 p-6 md:p-12 lg:max-w-none lg:space-y-28">
            <div className="text-shadow grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="lg:order-2">
                <FeatureImage src="/meetup.webp" alt="" width="1792" height="1024" />
              </div>
              <div className="flex flex-col justify-center space-y-5 lg:order-1">
                <h2 className="font-mono text-2xl font-extrabold">Yhteisö ohjelmoinnista kiinnostuneille</h2>
                <div className="space-y-5 font-mono text-sm leading-relaxed text-[#A597A1]">
                  <p>
                    Koodiklinikka on Suomen suurin ohjelmistoalan yhteisö, joka kokoaa yhteen ammattilaiset, harrastajat
                    ja vasta-alkajat. Tavoitteenamme on yhdistää ja kasvattaa suomalaista ohjelmointiyhteisöä sekä
                    tarjota apua ja uusia kontakteja kaikille ohjelmoinnista innostuneille.
                  </p>

                  <p>
                    Liittyminen on ilmaista ja helppoa. Jätä sähköpostiosoitteesi{' '}
                    <a href="#liity" className="underline underline-offset-4">
                      yllä olevaan kenttään
                    </a>
                    , niin lähetämme sinulle kutsun Slack-yhteisöömme.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-shadow grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <FeatureImage src="/opensource.webp" alt="" width="1792" height="1024" />
              </div>
              <div className="flex flex-col justify-center space-y-5">
                <h2 className="font-mono text-2xl font-extrabold">Avoin lähdekoodi &lt;3</h2>
                <div className="space-y-5 font-mono text-sm leading-relaxed text-[#A597A1]">
                  <p>
                    Suosimme avointa lähdekoodia ja kaikki käyttämämme koodi on vapaasti saatavilla sekä
                    hyödynnettävissä Github-organisaatiomme sivulta. Organisaation jäseneksi otamme kaikki
                    Slack-yhteisömme jäsenet. Koodiklinikan projekteihin voi osallistua kuka tahansa ja muutosideat ovat
                    aina lämpimästi tervetulleita!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </main>

      <Footer />
    </>
  );
}
