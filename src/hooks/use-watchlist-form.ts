import { useForm } from "react-hook-form";

export type WatchlistForm = {
  address: string;
  tag?: string;
  assetsNotifications: {
    xdai: { incoming: boolean; outgoing: boolean };
    fts: { incoming: boolean; outgoing: boolean };
    nfts: { incoming: boolean; outgoing: boolean };
  };
  emailNotification: boolean;
};

export const useWatchlistForm = (defaultValues: WatchlistForm) => {
  return useForm<WatchlistForm>({
    mode: "onChange",
    defaultValues,
  });
};
