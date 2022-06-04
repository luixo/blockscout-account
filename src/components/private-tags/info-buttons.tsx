import React from "react";
import { ButtonControls } from "../common/button-controls";
import { PrivateTagElement } from "../../types/tags";
import { trpc } from "../../utils/trpc";
import { useToast } from "../../hooks/use-toast";
import { modifyPrivateTag } from "../../utils/queries";
import { EditTagPopup } from "./edit-tag-popup";
import { InputsProps } from "./tag-form";

export type Props = {
  element: PrivateTagElement;
  editPopup: {
    title: string;
    hint?: string;
    valueConfig: InputsProps["valueConfig"];
  };
};

export const InfoButtons: React.FC<Props> = ({ element, editPopup }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const removeMutation = trpc.useMutation(["private-tags.delete"], {
    onMutate: ({ _id }) =>
      modifyPrivateTag(trpcContext, element.type, _id, () => undefined),
    onError: (error, { _id }, prevElement) => {
      toast.error(error.message);
      modifyPrivateTag(trpcContext, element.type, _id, (element) =>
        prevElement ? (prevElement as PrivateTagElement) : element
      );
    },
  });
  const onRemoveClick = React.useCallback(
    () =>
      removeMutation.mutate({
        _id: element._id,
        type: element.type,
      }),
    [removeMutation, element]
  );
  const editPopupChildren = React.useCallback(
    (close: () => void) => (
      <EditTagPopup
        element={element}
        title={editPopup.title}
        hint={editPopup.hint}
        onDone={close}
        valueConfig={editPopup.valueConfig}
      />
    ),
    [element, editPopup]
  );
  return (
    <ButtonControls
      onRemoveClick={onRemoveClick}
      editPopupChildren={editPopupChildren}
    />
  );
};
