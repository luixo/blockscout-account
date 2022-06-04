import { TRPCContextState } from "@trpc/react/dist/declarations/src/internals/context";
import { AppRouter } from "../router";
import { PrivateTagElement } from "../types/tags";
import { WatchlistElement } from "../types/watchlist";

const modifyElements = <T>(
  prevElements: T[],
  matcher: (element: T) => void,
  modifier: (data: T | undefined) => T | undefined
): { nextElements: T[]; prevElement: T | undefined } => {
  const prevElement = prevElements.find(matcher);
  const nextElement = modifier(prevElement);
  if (!nextElement) {
    return {
      nextElements: prevElements.filter((element) => element !== prevElement),
      prevElement,
    };
  }
  if (!prevElement) {
    return {
      nextElements: [...prevElements, nextElement],
      prevElement,
    };
  } else {
    return {
      nextElements: prevElements.map((element) =>
        element === prevElement ? nextElement : element
      ),
      prevElement,
    };
  }
};

export const modifyWatchlistElement = (
  trpcContext: TRPCContextState<AppRouter, unknown>,
  address: string,
  modifier: (data: WatchlistElement | undefined) => WatchlistElement | undefined
) => {
  let prevElement: WatchlistElement | undefined;
  trpcContext.setQueryData(["watchlist.get"], (prevElements = []) => {
    const modificationResult = modifyElements(
      prevElements,
      (element) => element.address === address,
      modifier
    );
    prevElement = modificationResult.prevElement;
    return modificationResult.nextElements;
  });
  return prevElement;
};

export const modifyPrivateTag = (
  trpcContext: TRPCContextState<AppRouter, unknown>,
  type: PrivateTagElement["type"],
  id: string,
  modifier: (
    data: PrivateTagElement | undefined
  ) => PrivateTagElement | undefined
) => {
  let prevElement: PrivateTagElement | undefined;
  trpcContext.setQueryData(
    ["private-tags.get", { type }],
    (prevElements = []) => {
      const modificationResult = modifyElements(
        prevElements,
        (element) => element._id === id,
        modifier
      );
      prevElement = modificationResult.prevElement;
      return modificationResult.nextElements;
    }
  );
  return prevElement;
};
