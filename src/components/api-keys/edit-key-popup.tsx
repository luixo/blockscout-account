import React from "react";
import { SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { ApiKey, ApiKeyForm } from "../../types/api-keys";
import { modifyApiKey } from "../../utils/queries";
import { useToast } from "../../hooks/use-toast";
import { ApiKeyFormView } from "./api-key-form";

type Props = {
  element: ApiKey;
  onDone: () => void;
};

export const EditKeyPopup: React.FC<Props> = ({ element, onDone }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const editTagMutation = trpc.useMutation(["api-keys.update"], {
    onMutate: (update) =>
      modifyApiKey(trpcContext, element.key, (element) => ({
        ...element,
        ...update,
      })),
    onError: (error, { key }, prevElement) => {
      toast.error(error.message);
      modifyApiKey(trpcContext, key, (element) =>
        prevElement ? (prevElement as ApiKey) : element
      );
    },
    onSuccess: onDone,
  });
  const onSubmit = React.useCallback(
    (close: () => void): SubmitHandler<ApiKeyForm> =>
      async (data) => {
        try {
          await editTagMutation.mutateAsync({
            ...data,
            key: element.key,
          });
          close();
        } catch {}
      },
    [editTagMutation, element.key]
  );

  return (
    <ApiKeyFormView
      title="Edit API key"
      onSubmit={onSubmit(close)}
      defaultValues={element}
      buttonText="Save changes"
      mutationLoading={editTagMutation.isLoading}
      apiKey={element.key}
    />
  );
};
