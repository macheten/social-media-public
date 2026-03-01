import React from "react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface Props {
  onClickDelete: () => void;
}

export const CommentItemMenu: React.FC<Props> = ({ onClickDelete }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='opacity-50'>
            <Ellipsis size={25} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='flex justify-between'>
            <span>Изменить</span>
            <Pencil />
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={onClickDelete}
            className='flex justify-between'
          >
            <span>Удалить</span>
            <Trash />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
