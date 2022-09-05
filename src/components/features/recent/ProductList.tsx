import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Products } from "../../../models/product";

import Card from "../../common/Card";

const Container = styled.ul`
  display: grid;
  @media screen and (max-width: 1330px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const ListEnd = styled.div`
  height: 10px;
`;

const ProductList = ({ resource }: { resource: any }) => {
  const products = resource.products.read();

  const [productList, setProductList] = useState<Products[]>(products);

  const endOfList = useRef<HTMLDivElement>(null);
  const io = useRef<IntersectionObserver | null>(null);

  // const ioCallback = useCallback(
  //   (entries: IntersectionObserverEntry[]) => {
  //     const [entry] = entries;

  //     if (entry.isIntersecting && entry.time > 1000) {
  //       offset.current = offset.current + 1;
  //       getProducts({ type: selected, offset: offset.current }).then((data) =>
  //         setProducts((prev) => [...prev, ...data])
  //       );
  //     }
  //   },
  //   [pathname]
  // );
  // useEffect(() => {
  //   io.current = new IntersectionObserver(ioCallback);

  //   endOfList.current && io.current.observe(endOfList.current);

  //   return () => io?.current?.disconnect();
  // }, [ioCallback]);

  return (
    <Container>
      {productList?.map((product: any) => {
        return <Card key={product.id} {...product}></Card>;
      })}
      <ListEnd ref={endOfList} />
    </Container>
  );
};

export default ProductList;
