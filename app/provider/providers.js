"use client";

import React, { useSyncExternalStore } from "react";
import { ThemeProvider } from "next-themes";

// A lightweight subscription function that reports if the window context is available
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Providers({ children }) {
  // Directly reads the environment snapshot without triggering an ongoing useEffect loop
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  // While rendering on the server side, return a clean fragment fallback
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
