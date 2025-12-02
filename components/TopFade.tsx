'use client';

import { useSyncExternalStore } from 'react';

const calculateBrightness = () => {
  if (window.scrollY > 200) return 0.5;
  const amountToDecrease = (window.scrollY / 200) * 0.5;
  return 1 - amountToDecrease;
};

const subscribe = (callback: () => void) => {
  document.addEventListener('scroll', callback, true);
  return () => document.removeEventListener('scroll', callback, true);
};

const getSnapshot = () => calculateBrightness();
const getServerSnapshot = () => 1;

export default function TopFade() {
  const brightness = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <div className="top-fade pointer-events-none" style={{ filter: `brightness(${brightness})` }}></div>;
}
