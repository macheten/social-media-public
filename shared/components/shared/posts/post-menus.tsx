import React, { PropsWithChildren } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Copy, Ellipsis, Forward, Pencil, Trash } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@shared/components/ui/context-menu";

const labels = [
  { text: "Изменить", icon: Pencil, action: "edit" },
  { text: "Поделиться", icon: Forward, action: "share" },
  { text: "Копировать", icon: Copy, action: "copy" },
  { text: "Удалить", icon: Trash, action: "delete", variant: "destructive" },
];

interface LabelsProps {
  Component: any;
  handleAction: (action: string) => void;
}

const MenuLabels: React.FC<LabelsProps> = ({ Component, handleAction }) => {
  return (
    <>
      {labels.map((item) => (
        <Component
          onClick={() => handleAction(item.action)}
          variant={item.variant || "default"}
          className='flex justify-between'
          key={item.action}
        >
          <span>{item.text}</span>
          <item.icon />
        </Component>
      ))}
    </>
  );
};

interface MenuProps {
  handleAction: (action: string) => void;
}

export const PostDropdownMenu: React.FC<MenuProps> = ({ handleAction }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='opacity-50'>
          <Ellipsis size={25} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <MenuLabels Component={DropdownMenuItem} handleAction={handleAction} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const PostContextMenu: React.FC<PropsWithChildren<MenuProps>> = ({
  children,
  handleAction,
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <MenuLabels Component={ContextMenuItem} handleAction={handleAction} />
      </ContextMenuContent>
    </ContextMenu>
  );
};
