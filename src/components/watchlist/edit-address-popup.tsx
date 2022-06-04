import React from "react";
import { SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { WatchlistElement, WatchlistForm } from "../../types/watchlist";
import { modifyWatchlistElement } from "../../utils/queries";
import { AddressPopup } from "./address-popup";
import { useToast } from "../../hooks/use-toast";

type Props = {
  element: WatchlistElement;
  onDone: () => void;
};

export const EditAddressPopup: React.FC<Props> = ({ element, onDone }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const editAddressMutation = trpc.useMutation(["watchlist.update"], {
    onMutate: (update) =>
      modifyWatchlistElement(trpcContext, update.address, (element) =>
        element
          ? {
              ...element,
              ...update,
            }
          : element
      ),
    onError: (error, { address }, prevElement) => {
      toast.error(error.message);
      modifyWatchlistElement(trpcContext, address, (element) =>
        prevElement ? (prevElement as WatchlistElement) : element
      );
    },
  });
  const onSubmit: SubmitHandler<WatchlistForm> = React.useCallback(
    async (data) => {
      try {
        await editAddressMutation.mutateAsync(data);
        onDone();
      } catch {}
    },
    [editAddressMutation, onDone]
  );

  return (
    <AddressPopup
      title="Edit watchlist address"
      onSubmit={onSubmit}
      defaultValues={{
        address: element.address,
        tag: element.tag,
        assetsNotifications: element.assetsNotifications,
        emailNotification: element.emailNotification,
      }}
      buttonText="Save changes"
      mutationLoading={editAddressMutation.isLoading}
    />
  );
};
