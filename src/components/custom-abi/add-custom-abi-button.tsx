import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "../../hooks/use-toast";
import { CustomAbiForm } from "../../types/custom-abi";
import { CustomAbiFormView } from "./custom-abi-form";
import { trpc } from "../../utils/trpc";
import { Button } from "../common/button";
import { Popup } from "../common/popup";
import { modifyCustomAbi } from "../../utils/queries";

type Props = {
  buttonDisabled?: boolean;
};

export const AddCustomAbiButton: React.FC<Props> = ({ buttonDisabled }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const addCustomAbiMutation = trpc.useMutation(["custom-abi.put"], {
    onMutate: (variables) => {
      const temporaryId = Math.random().toString();
      modifyCustomAbi(trpcContext, temporaryId, () => ({
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
      modifyCustomAbi(trpcContext, temporaryId, () => undefined);
    },
    onSuccess: (actualId, _variables, temporaryId: string | undefined) => {
      if (!temporaryId) {
        return;
      }
      modifyCustomAbi(trpcContext, temporaryId, (element) =>
        element ? { ...element, _id: actualId } : element
      );
    },
  });
  const onSubmit =
    (close: () => void): SubmitHandler<CustomAbiForm> =>
    async (data) => {
      try {
        await addCustomAbiMutation.mutateAsync(data);
        close();
      } catch {}
    };
  return (
    <Popup
      trigger={
        <Button minWidth={200} disabled={buttonDisabled}>
          Add custom ABI
        </Button>
      }
    >
      {(close) => (
        <CustomAbiFormView
          buttonText="Save"
          title="New custom ABI"
          hint="It is the user’s responsibility to ensure that the provided ABI matches the contract, otherwise, errors may occur or results returned may be incorrect. "
          mutationLoading={addCustomAbiMutation.isLoading}
          onSubmit={onSubmit(close)}
        />
      )}
    </Popup>
  );
};
