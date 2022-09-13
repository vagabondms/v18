import { ImgHTMLAttributes } from "react";
import styled from "styled-components";
import useInView from "../../lib/hooks/useInView";

interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderColor: string;
}

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

const Placeholder = styled.div<{ $backgroundColor: string }>`
  width: 100%;
  aspect-ratio: 300 / 200;
  background: ${({ $backgroundColor }) => {
    return `${$backgroundColor}`;
  }};
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

const LazyLoadImage = ({ placeholderColor, ...args }: LazyLoadImageProps) => {
  const { ref: placeholderRef, inView } = useInView<HTMLDivElement>();

  return (
    <Placeholder ref={placeholderRef} $backgroundColor={placeholderColor}>
      {inView && <Image {...args} />}
    </Placeholder>
  );
};

export default LazyLoadImage;
