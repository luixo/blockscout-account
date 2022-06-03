import { TRPCContextState } from "@trpc/react/dist/declarations/src/internals/context";
import { WithId } from "mongodb";
import { AppRouter } from "../router";
import { WatchlistElement } from "../types/watchlist";

export const modifyWatchlistElement = (
  trpcContext: TRPCContextState<AppRouter, unknown>,
  address: string,
  modifier: (
    data: WithId<WatchlistElement>
  ) => WithId<WatchlistElement> | undefined
) => {
  let prevElement: WithId<WatchlistElement> | undefined;
  trpcContext.setQueryData(["watchlist.get"], (prevElements) => {
    if (!prevElements) {
      return [];
    }
    const matchedElementIndex = prevElements.findIndex(
      (element) => element.address === address
    );
    if (matchedElementIndex === -1) {
      return prevElements;
    }
    prevElement = prevElements[matchedElementIndex];
    const nextElement = modifier(prevElement);
    if (!nextElement) {
      return prevElements.filter((element) => element !== prevElement);
    }
    return prevElements.map((element) =>
      element === prevElement ? nextElement : element
    );
  });
  return prevElement;
};
