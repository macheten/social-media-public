import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { Navigation } from "./navigation";
import { signOut } from "next-auth/react";
import { cn } from "@shared/lib/utils";

interface Props {
  className?: string
}

export const MobileNavigation: React.FC<Props> = ({ className }) => {
  return (
    <Drawer direction='left'>
      <DrawerTrigger className={'md:hidden'} asChild>
        <Button variant={"outline"}>
          <Menu /> Меню
        </Button>
      </DrawerTrigger>

      <DrawerContent className={cn('min-w-0 max-w-min')}>
        <DrawerHeader className='text-left'>
          <DrawerTitle className='text-2xl'>Меню</DrawerTitle>
        </DrawerHeader>

        <Navigation className='px-7' />

        <DrawerFooter>
          <Button
            size={'sm'}
            onClick={() => {
              if (window.confirm('Вы точно хотите выйти?')) {
                () => signOut()
              }
            }}
            variant={"outline"}
          >
            <LogOut className="text-primary" />
            Выйти
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
