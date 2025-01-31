import { create } from "zustand";
import { ElementType } from "react";

export type ModalProps<TDataSubmit = unknown> = {
  className?: string;
  onOpenChange?: (_flag: boolean) => void;
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data?: TDataSubmit) => void;
  onCancel?: () => void;
  [key: string]: unknown;
};

export type ModalBaseData<TDataSubmit = unknown> = {
  id: string;
  Component: ElementType;
  modalProps: ModalProps<TDataSubmit>;
};

type DialogStoreType = {
  dialogs: ModalBaseData[];
};

type DialogActionType = {
  openDialog: (_new: ModalBaseData) => void;
  closeAllDialogs: () => void;
  closeDialogById: (_id: string) => void;
};

export const useDialogStore = create<DialogStoreType & DialogActionType>((set, get) => ({
  dialogs: [],
  openDialog: (newDialog: ModalBaseData) => set({ dialogs: [...get().dialogs, newDialog] }),
  closeAllDialogs: () => set({ dialogs: [] }),
  closeDialogById: (id: string) => set({ dialogs: get().dialogs.filter((dialog) => dialog.id !== id) }),
}));
