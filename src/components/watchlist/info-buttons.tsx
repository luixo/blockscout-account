import React from "react";
import { WatchlistElement } from "../../types/watchlist";
import { modifyWatchlistElement } from "../../utils/queries";
import { trpc } from "../../utils/trpc";
import { EditAddressPopup } from "./edit-address-popup";
import { useToast } from "../../hooks/use-toast";
import { ButtonControls } from "../common/button-controls";

type Props = {
  element: WatchlistElement;
};

export const InfoButtons: React.FC<Props> = ({ element }) => {
  const toast = useToast();
  const trpcContext = trpc.useContext();
  const removeMutation = trpc.useMutation(["watchlist.delete"], {
    onMutate: ({ address }) => {
      return modifyWatchlistElement(trpcContext, address, () => undefined);
    },
    onError: (error, { address }, prevElement) => {
      toast.error(error.message);
      modifyWatchlistElement(trpcContext, address, (element) =>
        prevElement ? (prevElement as WatchlistElement) : element
      );
    },
  });
  const onRemoveClick = React.useCallback(
    () => removeMutation.mutate({ address: element.address }),
    [removeMutation, element.address]
  );
  const editPopupChildren = React.useCallback(
    (close: () => void) => (
      <EditAddressPopup onDone={close} element={element} />
    ),
    [element]
  );
  return (
    <ButtonControls
      onRemoveClick={onRemoveClick}
      editPopupChildren={editPopupChildren}
    />
  );
};
