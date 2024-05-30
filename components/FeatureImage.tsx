import Image from 'next/image';

export default function FeatureImage({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number | `${number}`;
  height: number | `${number}`;
  alt: string;
}) {
  return (
    <div className="relative  rounded-[18px] p-px shadow-2xl">
      <div
        className="fade-in-out absolute bottom-0 left-0 right-0 top-0 z-0  rounded-[17px] bg-gradient-to-tr from-[#4d094e] to-pink-500/70 p-[2px] "
        style={{
          WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          animationDelay: `${Math.floor(Math.random() * 5) + 1 * 0.5}s`,
        }}
      ></div>

      <Image className="relative z-10 block rounded-2xl " src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
