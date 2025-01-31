import { useDialogStore } from "@shared/stores/dialog.store";

export function DialogProvider() {
  const { dialogs } = useDialogStore();
  console.log("🚀 ~ DialogProvider ~ dialogs:", dialogs);

  return (
    <>
      {dialogs.map(({ Component, modalProps, id }) => (
        <Component key={id} {...modalProps} />
      ))}
    </>
  );
}
