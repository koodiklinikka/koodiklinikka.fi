'use client';

import { useEffect, useState } from 'react';

const calculatedBrightnessValue = () => {
  if (typeof window === 'undefined') return null;
  if (window.scrollY > 200) return 0.5;
  const amountToDecrease = (window.scrollY / 200) * 0.5;
  return 1 - amountToDecrease;
};

export default function TopFade() {
  const [brightness, setBrightness] = useState<number | null>(null);

  useEffect(() => {
    // Always set correct value when first render on client side
    setBrightness(calculatedBrightnessValue());

    const handleScroll = (event: Event) => {
      if (window.scrollY > 200 && brightness === 0.5) return;
      setBrightness(calculatedBrightnessValue());
    };

    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [brightness]);

  return (
    <div
      className="top-fade pointer-events-none"
      style={
        brightness
          ? {
              filter: `brightness(${brightness})`,
            }
          : {}
      }
    ></div>
  );
}
