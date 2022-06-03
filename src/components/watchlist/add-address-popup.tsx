import React from "react";
import { SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { WatchlistForm } from "../../hooks/use-watchlist-form";
import { AddressPopup } from "./address-popup";
import { useToast } from "../../hooks/use-toast";

type Props = {
  onDone: () => void;
};

export const AddAddressPopup: React.FC<Props> = ({ onDone }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const addAddressMutation = trpc.useMutation(["watchlist.put"], {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      trpcContext.invalidateQueries(["watchlist.get"]);
      onDone();
    },
  });
  const onSubmit: SubmitHandler<WatchlistForm> = (data) => {
    addAddressMutation.mutate(data);
  };

  return (
    <AddressPopup
      title="New Address to Watchlist"
      prefix={
        <div>
          An Email notification can be sent to you when an address on your watch
          list sends or receives any transactions.
        </div>
      }
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
