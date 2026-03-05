"use client";

import React, { useEffect, useState } from "react";
import { AuthModal } from "./modals/auth-modal/auth-modal";
import { AuthButton } from "./auth-button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Container } from "./container";
import { useBreakpoint } from "@shared/lib/hooks/use-breakpoint";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";

export const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has("verified")) {
      setTimeout(() => {
        toast.success("Вы успешно подтвердили аккаунт!");
        router.push("/");
      }, 1000);
    }
  }, []);

  return (
    <div className='p-2 border-b dark:bg-accent bg-white mb-2 shadow sticky top-0 z-1'>
      <Container>
        <div className='flex justify-between items-center'>
          <Link className='text-xl sm:text-2xl' href={"/"}>
            Social Media
          </Link>

          <div className="flex gap-2">
            <AuthButton onClick={() => setOpenModal(true)} />
            <MobileNavigation />
          </div>
          <AuthModal onClose={() => setOpenModal(false)} open={openModal} />
        </div>
      </Container>
    </div>
  );
};
