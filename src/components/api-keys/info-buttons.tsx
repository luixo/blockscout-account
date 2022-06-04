import React from "react";
import { ButtonControls } from "../common/button-controls";
import { trpc } from "../../utils/trpc";
import { useToast } from "../../hooks/use-toast";
import { modifyApiKey } from "../../utils/queries";
import { EditKeyPopup } from "./edit-key-popup";
import { ApiKey } from "../../types/api-keys";

type Props = {
  element: ApiKey;
};

export const InfoButtons: React.FC<Props> = ({ element }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const removeMutation = trpc.useMutation(["api-keys.delete"], {
    onMutate: ({ key }) => modifyApiKey(trpcContext, key, () => undefined),
    onError: (error, { key }, prevElement) => {
      toast.error(error.message);
      modifyApiKey(trpcContext, key, (element) =>
        prevElement ? (prevElement as ApiKey) : element
      );
    },
  });
  const onRemoveClick = React.useCallback(
    () => removeMutation.mutate({ key: element.key }),
    [removeMutation, element.key]
  );
  const editPopupChildren = React.useCallback(
    (close: () => void) => <EditKeyPopup element={element} onDone={close} />,
    [element]
  );
  return (
    <ButtonControls
      onRemoveClick={onRemoveClick}
      editPopupChildren={editPopupChildren}
    />
  );
};
