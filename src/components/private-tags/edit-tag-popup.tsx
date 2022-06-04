import React from "react";
import { SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { PrivateTagElement, PrivateTagForm } from "../../types/tags";
import { modifyPrivateTag } from "../../utils/queries";
import { useToast } from "../../hooks/use-toast";
import { TagForm, InputsProps } from "./tag-form";

type Props = {
  element: PrivateTagElement;
  title: string;
  hint?: string;
  onDone: () => void;
  valueConfig: InputsProps["valueConfig"];
};

export const EditTagPopup: React.FC<Props> = ({
  element,
  onDone,
  hint,
  title,
  valueConfig,
}) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const editTagMutation = trpc.useMutation(["private-tags.update"], {
    onMutate: (update) =>
      modifyPrivateTag(trpcContext, element.type, update._id, (element) => ({
        ...element,
        ...update,
      })),
    onError: (error, { _id }, prevElement) => {
      toast.error(error.message);
      modifyPrivateTag(trpcContext, element.type, _id, (element) =>
        prevElement ? (prevElement as PrivateTagElement) : element
      );
    },
    onSuccess: onDone,
  });
  const onSubmit = React.useCallback(
    (close: () => void): SubmitHandler<PrivateTagForm> =>
      async (data) => {
        try {
          await editTagMutation.mutateAsync({
            ...data,
            _id: element._id,
            type: element.type,
          });
          close();
        } catch {}
      },
    [editTagMutation, element.type, element._id]
  );

  return (
    <TagForm
      title={title}
      hint={hint}
      onSubmit={onSubmit(close)}
      defaultValues={element}
      buttonText="Save changes"
      mutationLoading={editTagMutation.isLoading}
      valueConfig={valueConfig}
    />
  );
};
