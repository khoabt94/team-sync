import { useDialogStore } from "@shared/stores/dialog.store";

export function DialogProvider() {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map(({ Component, modalProps, id }) => (
        <Component key={id} {...modalProps} />
      ))}
    </>
  );
}
