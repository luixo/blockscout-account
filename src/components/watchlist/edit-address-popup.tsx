import React from "react";
import { SubmitHandler } from "react-hook-form";
import { WithId } from "mongodb";
import { trpc } from "../../utils/trpc";
import { WatchlistForm } from "../../hooks/use-watchlist-form";
import { WatchlistElement } from "../../types/watchlist";
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
      modifyWatchlistElement(trpcContext, update.address, (element) => ({
        ...element,
        ...update,
      })),
    onError: (error, { address }, prevElement) => {
      toast.error(error.message);
      modifyWatchlistElement(trpcContext, address, (element) =>
        prevElement ? (prevElement as WithId<WatchlistElement>) : element
      );
    },
    onSuccess: onDone,
  });
  const onSubmit: SubmitHandler<WatchlistForm> = (data) => {
    editAddressMutation.mutate(data);
  };

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
