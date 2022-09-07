import styled from "styled-components";

import Like from "../../lib/icons/Like";
import LazyLoadImage from "./LazyLoadImage";
import { Photo } from "../../api/getPhotos";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
`;

const StyledLikes = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Title = styled.div``;

type CardProps = Photo;

const Card = ({ urls, likes, user, tags }: CardProps) => {
  const srcset = `${urls.thumb} 200w, ${urls.small} 400w, ${urls.regular} 700w`;
  return (
    <Container>
      <LazyLoadImage
        sizes="(max-width: 1000px) 200px,
            (max-width: 1200px) 400px,
            700px"
        srcSet={srcset}
        src={urls.regular}
        alt={"product-image"}
      />
      <Details>
        <Title>{user.name}</Title>
        <StyledLikes>
          <Like width={16} height={16} />
          {likes}
        </StyledLikes>
      </Details>
    </Container>
  );
};

export default Card;
