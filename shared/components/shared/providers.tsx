"use client";

import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "react-hot-toast";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <NextTopLoader color="var(--primary)" />
      <Toaster />
      {children}
    </SessionProvider>
  );
};
