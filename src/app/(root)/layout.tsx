import { Skeleton } from "@shared/components/ui/skeleton";
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
    <main className='min-h-screen'>
      <Suspense fallback={<Skeleton className="sticky top-0 z-1 h-[53px]" />}>
        <Header />
      </Suspense>
      <div className='max-w-6xl mx-auto w-full gap-6 pb-2 p-2 flex'>
        <Navigation className="not-md:hidden sticky top-18 self-start w-48" />
        <div className='min-h-0 flex-1'>{children}</div>
      </div>
      {modal}
    </main>
  );
}
