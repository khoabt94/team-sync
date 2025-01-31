import { ModalBaseData, useDialogStore } from "@shared/stores/dialog.store";

export function useOpenDialog() {
  const { closeAllDialogs, closeDialogById, openDialog } = useDialogStore();

  const open = (newDialog: ModalBaseData) => {
    openDialog({
      ...newDialog,
      modalProps: {
        ...newDialog.modalProps,
        onSubmit: (data: unknown) => {
          newDialog.modalProps.onSubmit?.(data);
          closeDialogById(newDialog.id);
        },
        onClose: () => {
          newDialog.modalProps.onClose?.();
          closeDialogById(newDialog.id);
        },
      },
    });
  };

  return { open, closeAllDialogs, closeDialogById };
}
