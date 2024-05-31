'use client';

import { useEffect, useState } from 'react';

const calculatedBrightnessValue = () => {
  if (window.scrollY > 200) return 0.5;
  const amountToDecrease = (window.scrollY / 200) * 0.5;
  return 1 - amountToDecrease;
};

export default function TopFade() {
  const [brightness, setBrightness] = useState(calculatedBrightnessValue());

  const handleScroll = (event: Event) => {
    if (window.scrollY > 200 && brightness === 0.5) return;
    setBrightness(calculatedBrightnessValue());
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <div
      className="top-fade pointer-events-none"
      style={{
        filter: `brightness(${brightness})`,
      }}
    ></div>
  );
}
