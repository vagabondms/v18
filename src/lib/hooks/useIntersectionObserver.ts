import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";

type Params = {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
};

type Return<T> = {
  ref: RefObject<T>;
};

const useIntersectionObserver = <T extends HTMLElement>({
  callback,
  options,
}: Params): Return<T> => {
  const ref = useRef<T>(null);

  const ioCallback = useCallback(callback, [callback]);
  const ioOptions = useMemo(() => options, [options]);

  useEffect(() => {
    const io = new IntersectionObserver(ioCallback, ioOptions ?? {});
    ref.current && io.observe(ref.current);
  }, [ioCallback, ioOptions]);

  return {
    ref,
  };
};

export default useIntersectionObserver;
