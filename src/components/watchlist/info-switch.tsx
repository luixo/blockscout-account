import React from "react";
import { WithId } from "mongodb";
import { useToast } from "../../hooks/use-toast";
import { WatchlistElement } from "../../types/watchlist";
import { modifyWatchlistElement } from "../../utils/queries";
import { trpc } from "../../utils/trpc";
import { Switch } from "../common/switch";

type Props = {
  element: WatchlistElement;
};

export const InfoSwitch: React.FC<Props> = ({ element }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const switchMailMutation = trpc.useMutation(
    ["watchlist.switch-mail-notification"],
    {
      onMutate: ({ address }) => {
        return modifyWatchlistElement(trpcContext, address, (element) => ({
          ...element,
          emailNotification: !element.emailNotification,
        }));
      },
      onError: (error, { address }, prevElement) => {
        toast.error(error.message);
        modifyWatchlistElement(trpcContext, address, (element) =>
          prevElement ? (prevElement as WithId<WatchlistElement>) : element
        );
      },
    }
  );
  return (
    <Switch
      checked={element.emailNotification}
      disabled={switchMailMutation.isLoading}
      onChange={() => switchMailMutation.mutate({ address: element.address })}
    />
  );
};
