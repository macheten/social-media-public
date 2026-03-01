import { create } from "zustand";

interface Store {
  editContent: string;
  editMode: boolean;
  messageId: string | null;

  setEditContent: (editContent: string) => void;
  beginEditMode: (messageId: string, editContent: string) => void;
  quitEditMode: () => void;
}

export const useEditMessageStore = create<Store>((set) => ({
  editContent: "",
  editMode: false,
  messageId: null,

  setEditContent(editContent) {
    set({ editContent })
  },

  beginEditMode(messageId, editContent) {
    set({ editMode: true, messageId, editContent,  });
  },

  quitEditMode() {
    set({ editMode: false, editContent: "", messageId: null });
  },
}));
