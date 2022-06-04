import React from "react";
import { SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { CustomAbi, CustomAbiForm } from "../../types/custom-abi";
import { modifyCustomAbi } from "../../utils/queries";
import { useToast } from "../../hooks/use-toast";
import { CustomAbiFormView } from "./custom-abi-form";

type Props = {
  element: CustomAbi;
  onDone: () => void;
};

export const EditCustomAbiPopup: React.FC<Props> = ({ element, onDone }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const editCustomAbiMutation = trpc.useMutation(["custom-abi.update"], {
    onMutate: (update) =>
      modifyCustomAbi(trpcContext, update._id, (element) => ({
        ...element,
        ...update,
      })),
    onError: (error, { _id }, prevElement) => {
      toast.error(error.message);
      modifyCustomAbi(trpcContext, _id, (element) =>
        prevElement ? (prevElement as CustomAbi) : element
      );
    },
    onSuccess: onDone,
  });
  const onSubmit = React.useCallback(
    (close: () => void): SubmitHandler<CustomAbiForm> =>
      async (data) => {
        try {
          await editCustomAbiMutation.mutateAsync({
            _id: element._id,
            ...data,
          });
          close();
        } catch {}
      },
    [editCustomAbiMutation, element._id]
  );

  return (
    <CustomAbiFormView
      title="Edit custom ABI"
      hint="It is the user’s responsibility to ensure that the provided ABI matches the contract, otherwise, errors may occur or results returned may be incorrect. "
      onSubmit={onSubmit(close)}
      defaultValues={element}
      buttonText="Save changes"
      mutationLoading={editCustomAbiMutation.isLoading}
    />
  );
};
