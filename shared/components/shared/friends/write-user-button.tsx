import React from "react";
import { Button } from "../../ui/button";
import { MessageCircle } from "lucide-react";

interface Props {
    onClickWrite: () => Promise<void>
    hasChat: boolean
}

export const WriteUserButton: React.FC<Props> = ({ onClickWrite, hasChat }) => {
  return (
      <Button variant={'outline'} className="w-26" onClick={onClickWrite} size={"sm"}>
        <MessageCircle />
        {hasChat ? "В чат" : "Написать"}
      </Button>
  );
};
