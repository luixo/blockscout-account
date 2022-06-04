import React from "react";
import { SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { WatchlistForm } from "../../types/watchlist";
import { AddressPopup } from "./address-popup";
import { useToast } from "../../hooks/use-toast";

type Props = {
  closePopup: () => void;
};

export const AddAddressPopup: React.FC<Props> = ({ closePopup }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const addAddressMutation = trpc.useMutation(["watchlist.put"], {
    onError: (error) => toast.error(error.message),
    onSuccess: () => trpcContext.invalidateQueries(["watchlist.get"]),
  });
  const onSubmit: SubmitHandler<WatchlistForm> = React.useCallback(
    async (data) => {
      await addAddressMutation.mutateAsync(data);
      closePopup();
    },
    [closePopup, addAddressMutation]
  );

  return (
    <AddressPopup
      title="New Address to Watchlist"
      hint="An Email notification can be sent to you when an address on your watch list sends or receives any transactions."
      onSubmit={onSubmit}
      defaultValues={{
        address: "",
        assetsNotifications: {
          xdai: {
            incoming: true,
            outgoing: false,
          },
          fts: {
            incoming: false,
            outgoing: false,
          },
          nfts: {
            incoming: false,
            outgoing: false,
          },
        },
        emailNotification: true,
      }}
      buttonText="Add address"
      mutationLoading={addAddressMutation.isLoading}
    />
  );
};
