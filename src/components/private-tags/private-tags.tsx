import React from "react";
import { PrivateTagElement } from "../../types/tags";
import { PrivateTagsTable } from "./private-tags-table";
import { styled } from "../../styles";
import { trpc } from "../../utils/trpc";
import { AddTagButton } from "./add-tag-button";
import {
  ethereumAddressRegexp,
  ethereumTransactionRegexp,
} from "../../utils/validation";

const DATA = {
  address: {
    hint: "A private name tag (up to 30 chars) for individual addresses can be saved and is useful for labelling addresses of interest.",
    label: "Address",
    validationPattern: ethereumAddressRegexp,
    addButton: "Add address tag",
    popup: {
      hint: "A private name tag (up to 30 chars) for individual address can be saved and is useful for labelling addresses of interest.",
      createTitle: "New address tag",
      editTitle: "Edit address tag",
    },
  },
  transaction: {
    hint: "A private transaction note can be saved and is useful for transaction tracking.",
    label: "Transaction",
    validationPattern: ethereumTransactionRegexp,
    addButton: "Add transaction tag",
    popup: {
      hint: "A private name tag (up to 30 chars) for individual transactions can be saved and is useful for labelling transactions of interest.",
      createTitle: "New transaction tag",
      editTitle: "Edit transaction tag",
    },
  },
} as const;

const Hint = styled("div");

const Wrapper = styled("div");

type Props = {
  type: PrivateTagElement["type"];
};

export const PrivateTags: React.FC<Props> = ({ type }) => {
  const privateTagsQuery = trpc.useQuery(["private-tags.get", { type }]);
  const data = DATA[type];
  const valueConfig = React.useMemo(
    () => ({
      label: data.label,
      pattern: data.validationPattern,
    }),
    [data]
  );
  return (
    <Wrapper>
      <Hint>{data.hint}</Hint>
      <PrivateTagsTable
        query={privateTagsQuery}
        valueHeader={data.label}
        editPopup={React.useMemo(
          () => ({
            title: data.label,
            valueConfig: valueConfig,
          }),
          [data, valueConfig]
        )}
      />
      <AddTagButton
        type={type}
        hint={data.popup.hint}
        popupTitle={data.popup.createTitle}
        buttonText={data.addButton}
        valueConfig={valueConfig}
      />
    </Wrapper>
  );
};
