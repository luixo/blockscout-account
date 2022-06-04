import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "../../hooks/use-toast";
import { PrivateTagElement, PrivateTagForm } from "../../types/tags";
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
    onError: (error) => toast.error(error.message),
    onSuccess: () =>
      trpcContext.invalidateQueries(["private-tags.get", { type }]),
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
