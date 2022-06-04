export type PrivateTagElement = {
  _id: string;
  type: "address" | "transaction";
  value: string;
  tag: string;
};

export type PrivateTagForm = {
  value: string;
  tag: string;
};
