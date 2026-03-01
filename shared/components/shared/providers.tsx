"use client";

import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};
