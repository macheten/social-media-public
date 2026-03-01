import { create } from 'zustand';

interface CreateChatModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateChatModal = create<CreateChatModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));