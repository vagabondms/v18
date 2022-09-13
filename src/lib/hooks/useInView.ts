import { useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit
) => {
  const [inView, setInView] = useState<boolean>(false);

  const callback: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    if (entry.intersectionRatio > 0) {
      setInView(true);
    }
  };

  const { ref } = useIntersectionObserver<T>({
    callback,
    options,
  });

  return {
    ref,
    inView,
  };
};

export default useInView;
