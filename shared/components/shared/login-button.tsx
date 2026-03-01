"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import { Button } from "../ui/button";
import { AuthModal } from "./modals/auth-modal/auth-modal";
import { LogIn } from "lucide-react";

interface Props {
  className?: string;
}

export const LoginButton: React.FC<Props> = ({ className }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className={cn(className)}>
      <Button onClick={() => setOpenModal(true)}>Войти
      <LogIn />
      </Button>
      <AuthModal onClose={() => setOpenModal(false)} open={openModal} />
    </div>
  );
};
