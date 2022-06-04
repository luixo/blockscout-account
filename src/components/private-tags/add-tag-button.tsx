import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "../../hooks/use-toast";
import { PrivateTagElement, PrivateTagForm } from "../../types/tags";
import { modifyPrivateTag } from "../../utils/queries";
import { trpc } from "../../utils/trpc";
import { Button } from "../common/button";
import { Popup } from "../common/popup";
import { InputsProps, TagForm } from "./tag-form";

type Props = {
  type: PrivateTagElement["type"];
  popupTitle: string;
  hint: string;
  valueConfig: InputsProps["valueConfig"];
  buttonText: string;
};

export const AddTagButton: React.FC<Props> = ({
  type,
  hint,
  valueConfig,
  buttonText,
  popupTitle,
}) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const addTagMutation = trpc.useMutation(["private-tags.put"], {
    onMutate: (variables) => {
      const temporaryId = Math.random().toString();
      modifyPrivateTag(trpcContext, type, temporaryId, () => ({
        ...variables,
        _id: temporaryId,
      }));
      return temporaryId;
    },
    onError: (error, _variables, temporaryId: string | undefined) => {
      toast.error(error.message);
      if (!temporaryId) {
        return;
      }
      modifyPrivateTag(trpcContext, type, temporaryId, () => undefined);
    },
    onSuccess: (actualId, _variables, temporaryId: string | undefined) => {
      if (!temporaryId) {
        return;
      }
      modifyPrivateTag(trpcContext, type, temporaryId, (element) =>
        element ? { ...element, _id: actualId } : element
      );
    },
  });
  const onSubmit =
    (close: () => void): SubmitHandler<PrivateTagForm> =>
    async (data) => {
      try {
        await addTagMutation.mutateAsync({
          type,
          ...data,
        });
        close();
      } catch {}
    };
  return (
    <Popup trigger={<Button minWidth={200}>Add tag</Button>}>
      {(close) => (
        <TagForm
          buttonText={buttonText}
          title={popupTitle}
          hint={hint}
          mutationLoading={addTagMutation.isLoading}
          valueConfig={valueConfig}
          onSubmit={onSubmit(close)}
        />
      )}
    </Popup>
  );
};
