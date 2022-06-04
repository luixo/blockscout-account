import { Button } from "../common/button";
import { Popup } from "../common/popup";
import { AddAddressPopup } from "./add-address-popup";

export const AddAddressButton = () => {
  return (
    <Popup trigger={<Button minWidth={200}>Add address</Button>}>
      {(close) => <AddAddressPopup closePopup={close} />}
    </Popup>
  );
};
