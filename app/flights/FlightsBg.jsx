'use client';

import DotField from "@/components/DotField";
export default function FlightsBg() {
  return (
    <DotField
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      dotRadius={2.5}
      dotSpacing={18}
      cursorRadius={400}
      bulgeStrength={20}
      glowRadius={180}
      gradientFrom="rgba(247, 147, 30, 0.25)"
      gradientTo="rgba(0, 112, 161, 0.15)"
      glowColor="#F7931E"
    />
  );
}