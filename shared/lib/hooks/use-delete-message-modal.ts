import { useCallback, useState } from "react";

interface State {
  isOpen: boolean;
  messageId: string | null;
}

export const useDeleteMessageModal = () => {
  const [state, setState] = useState<State>({
    isOpen: false,
    messageId: null,
  });

  // console.log(state.messageId);

  const open = useCallback((messageId: string) => {
    setState({
      isOpen: true,
      messageId,
    });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({
      messageId: prev.messageId,
      isOpen: false,
    }));
  }, []);

  return {
    ...state,
    open,
    close,
  };
};
