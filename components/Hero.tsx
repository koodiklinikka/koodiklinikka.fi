import Form from './Form';

export default function Hero() {
  return (
    <div className="text-shadow mx-auto flex flex-col items-center justify-center" id="liity">
      <h1 className="my-14 text-center text-2xl leading-tight font-extrabold sm:max-w-[80%] sm:text-3xl md:my-24 md:text-4xl lg:my-32 lg:text-5xl">
        Koodiklinikka on Suomen suurin <span className="title-highlight">ohjelmistoalan yhteisö</span>, joka tuo alan
        ammattilaiset ja harrastajat yhteen
      </h1>

      <Form />
    </div>
  );
}
