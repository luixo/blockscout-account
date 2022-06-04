export type FiatAmount = {
  amount: number;
  currency: string;
};

export type CryptoAmount = {
  amount: number;
  tokenName: string;
  estimated: FiatAmount;
};

export type WatchlistElement = {
  iconUrl: string;
  address: string;
  baseToken: CryptoAmount;
  tokens?: {
    quantity: number;
    estimated: FiatAmount;
  };
  totalBalance: FiatAmount;
  tag?: string;
  assetsNotifications: {
    xdai: { incoming: boolean; outgoing: boolean };
    fts: { incoming: boolean; outgoing: boolean };
    nfts: { incoming: boolean; outgoing: boolean };
  };
  emailNotification: boolean;
};

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
