'use client';

import { useEffect, useState } from 'react';

export default function TopFade() {
  const [brightness, setBrightness] = useState(1);

  const handleScroll = (event: Event) => {
    if (window.scrollY > 200) {
      if (brightness === 0.5) return;
      setBrightness(0.5);
      return;
    }

    const amountToDecrease = (window.scrollY / 200) * 0.5;
    setBrightness(1 - amountToDecrease);
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
