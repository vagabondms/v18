import styled from "styled-components";
import View from "../../lib/icons/View";
import Like from "../../lib/icons/Like";
import LazyLoadImage from "./LazyLoadImage";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div``;

interface CardProps {
  name: string;
  image: string;
  likes: number;
  views: number;
}

const Card = ({ image, name, likes, views }: CardProps) => {
  return (
    <Container>
      <LazyLoadImage src={image} alt={"product-image"} />
      <Details>
        <Title>{name}</Title>
        <span>
          <span>
            <View />
            {views}
          </span>
          <span>
            <Like />
            {likes}
          </span>
        </span>
      </Details>
    </Container>
  );
};

export default Card;
