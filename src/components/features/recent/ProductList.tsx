import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "../../../api/fakeAPI";
import { Products } from "../../../models/product";
import Card from "../../common/Card";

const Container = styled.ul`
  display: grid;
  @media screen and (max-width: 1330px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const EndOfList = styled.div`
  height: 10px;
`;

const ProductList = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const { pathname } = useLocation();
  const offset = useRef<number>(0);

  useEffect(() => {
    offset.current = 0;
    getProducts({ type: pathname, offset: offset.current }).then((data) => {
      setProducts(data);
    });
  }, [pathname]);

  const endOfList = useRef<HTMLDivElement>(null);
  const io = useRef<IntersectionObserver | null>(null);
  const ioCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [element] = entries;

      if (element.isIntersecting) {
        offset.current = offset.current + 1;
        getProducts({ type: pathname, offset: offset.current }).then((data) =>
          setProducts((prev) => [...prev, ...data])
        );
      }
    },
    [pathname]
  );
  useEffect(() => {
    io.current = new IntersectionObserver(ioCallback);

    endOfList.current && io.current.observe(endOfList.current);

    return () => io?.current?.disconnect();
  }, [ioCallback]);

  return (
    <Container>
      {products?.map((product) => {
        return <Card key={product.id} {...product}></Card>;
      })}
      <EndOfList ref={endOfList} />
    </Container>
  );
};

export default ProductList;
