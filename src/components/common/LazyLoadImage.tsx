import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Image = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  aspect-ratio: 300 / 200;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 100%;
  aspect-ratio: 300 / 200;
  background: rgba(250, 250, 250, 0.788);
  position: relative;

  border-radius: 10px;

  overflow: hidden;
`;

const LazyLoadImage = ({
  src,
  alt,
  width,
  height,
  ...args
}: LazyLoadImageProps) => {
  const io = useRef<IntersectionObserver | null>(null);
  const [inView, setInView] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;

      if (entry.intersectionRatio > 0) {
        setInView(true);
      }
    };

    io.current = new IntersectionObserver(callback, {});

    imgRef.current && io.current.observe(imgRef.current);

    return () => io?.current?.disconnect();
  }, []);

  return (
    <Placeholder ref={imgRef}>
      {inView && <Image alt={alt} src={src} {...args} />}
    </Placeholder>
  );
};

export default LazyLoadImage;
