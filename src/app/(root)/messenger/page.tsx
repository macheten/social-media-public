import { ChatListPanel } from "@shared/components/shared/messenger/chat/chat-list-panel";
import { ChatPanel } from "@shared/components/shared/messenger/chat/chat-panel";
import { WhiteBlock } from "@shared/components/shared/white-block";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@shared/components/ui/resizable";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { cn } from "@shared/lib/utils";

interface PageProps {
  searchParams: Promise<{
    chatId: string | undefined;
  }>;
}

export default async function MessengerPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  const { chatId } = await searchParams;

  if (!session) {
    return redirect("/unauthorized");
  }

  return (
    <WhiteBlock className='p-2 h-[calc(100vh-70px)]'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel
          collapsible
          minSize={13}
          maxSize={25}
          defaultSize={25}
        >
          <ChatListPanel authorizedId={session.user.id} />
        </ResizablePanel>

        <ResizableHandle className='mx-2' />

        <ResizablePanel defaultSize={75}>
          <ChatPanel authorizedId={session.user.id} chatId={chatId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </WhiteBlock>
  );
}
