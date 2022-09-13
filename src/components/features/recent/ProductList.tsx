import { useRef } from "react";
import styled from "styled-components";

import Card from "../../common/Card";

const Container = styled.ul`
  display: grid;
  width: 100%;
  padding: 0 24px;

  @media screen and (max-width: 1330px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: auto 1fr;
`;

const ListEnd = styled.div`
  height: 10px;
`;

const ProductList = ({ resource }: { resource: any }) => {
  const { results } = resource.products.read();

  const endOfList = useRef<HTMLDivElement>(null);

  //TODO InfiniteScroll

  return (
    <Container>
      {results?.map((photo: any) => {
        return <Card key={photo.id} photo={photo}></Card>;
      })}
      <ListEnd ref={endOfList} />
    </Container>
  );
};

export default ProductList;
