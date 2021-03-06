import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "../../hooks/use-toast";
import { ApiKeyForm } from "../../types/api-keys";
import { ApiKeyFormView } from "./api-key-form";
import { trpc } from "../../utils/trpc";
import { Button } from "../common/button";
import { Popup } from "../common/popup";
import { modifyApiKey } from "../../utils/queries";

type Props = {
  buttonDisabled?: boolean;
};

export const AddApiKeyButton: React.FC<Props> = ({ buttonDisabled }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const addApiKeyMutation = trpc.useMutation(["api-keys.put"], {
    onMutate: (variables) => {
      const temporaryKey = "loading..";
      modifyApiKey(trpcContext, temporaryKey, () => ({
        ...variables,
        key: temporaryKey,
      }));
      return temporaryKey;
    },
    onError: (error, _variables, temporaryKey: string | undefined) => {
      toast.error(error.message);
      if (!temporaryKey) {
        return;
      }
      modifyApiKey(trpcContext, temporaryKey, () => undefined);
    },
    onSuccess: (actualKey, _variables, temporaryKey: string | undefined) => {
      if (!temporaryKey) {
        return;
      }
      modifyApiKey(trpcContext, temporaryKey, (element) =>
        element ? { ...element, key: actualKey } : element
      );
    },
  });
  const onSubmit =
    (close: () => void): SubmitHandler<ApiKeyForm> =>
    async (data) => {
      try {
        await addApiKeyMutation.mutateAsync(data);
        close();
      } catch {}
    };
  return (
    <Popup
      trigger={
        <Button minWidth={200} disabled={buttonDisabled}>
          Add API key
        </Button>
      }
    >
      {(close) => (
        <ApiKeyFormView
          buttonText="Generate API key"
          title="New API key"
          hint="Add application name to identify your API key. Click on the button below and new API key will generate automatically on your dashboard."
          mutationLoading={addApiKeyMutation.isLoading}
          onSubmit={onSubmit(close)}
        />
      )}
    </Popup>
  );
};
