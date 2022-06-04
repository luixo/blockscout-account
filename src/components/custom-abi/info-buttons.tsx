import React from "react";
import { ButtonControls } from "../common/button-controls";
import { trpc } from "../../utils/trpc";
import { useToast } from "../../hooks/use-toast";
import { modifyCustomAbi } from "../../utils/queries";
import { EditCustomAbiPopup } from "./edit-custom-abi-popup";
import { CustomAbi } from "../../types/custom-abi";

type Props = {
  element: CustomAbi;
};

export const InfoButtons: React.FC<Props> = ({ element }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const removeMutation = trpc.useMutation(["custom-abi.delete"], {
    onMutate: ({ _id }) => modifyCustomAbi(trpcContext, _id, () => undefined),
    onError: (error, { _id }, prevElement) => {
      toast.error(error.message);
      modifyCustomAbi(trpcContext, _id, (element) =>
        prevElement ? (prevElement as CustomAbi) : element
      );
    },
  });
  const onRemoveClick = React.useCallback(
    () => removeMutation.mutate({ _id: element._id }),
    [removeMutation, element._id]
  );
  const editPopupChildren = React.useCallback(
    (close: () => void) => (
      <EditCustomAbiPopup element={element} onDone={close} />
    ),
    [element]
  );
  return (
    <ButtonControls
      onRemoveClick={onRemoveClick}
      editPopupChildren={editPopupChildren}
    />
  );
};
