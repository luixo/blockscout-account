import React from "react";
import { WithId } from "mongodb";
import { WatchlistElement } from "../../types/watchlist";
import { modifyWatchlistElement } from "../../utils/queries";
import { trpc } from "../../utils/trpc";
import { EditButton } from "../common/edit-button";
import { RemoveButton } from "../common/remove-button";
import { EditAddressPopup } from "./edit-address-popup";
import { Popup } from "../common/popup";
import { styled } from "../../styles";
import { useToast } from "../../hooks/use-toast";

const Buttons = styled("div", {
  display: "flex",

  "& > *:not(:first-child)": {
    marginLeft: 24,
  },
});

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
        prevElement ? (prevElement as WithId<WatchlistElement>) : element
      );
    },
  });
  return (
    <Buttons>
      <Popup trigger={<EditButton />}>
        {(close) => <EditAddressPopup onDone={close} element={element} />}
      </Popup>
      <RemoveButton
        onClick={() => removeMutation.mutate({ address: element.address })}
      />
    </Buttons>
  );
};
