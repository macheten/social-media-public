import { Header } from "../../../shared/components/shared/header";
import { Navigation } from "../../../shared/components/shared/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Social Media",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen grid grid-rows-[auto_1fr]'>
      <Suspense>
        <Header />
      </Suspense>
      <div className='max-w-6xl mx-auto w-full grid grid-cols-[192px_1fr] gap-6 pb-2'>
        <Navigation />
        <div className='min-h-0'>{children}</div>
      </div>
      {modal}
    </main>
  );
}
