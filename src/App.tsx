import "./normalize.css";

import Filter from "./components/features/recent/Filter";

import { Suspense, useCallback, useRef, useState, useTransition } from "react";
import { getProducts } from "./api/fakeAPI";
import ProductList from "./components/features/recent/ProductList";

const initialResource = getProducts({ type: "/discover", offset: 0 });

function App() {
  const [selected, setSelected] = useState<string>("/discover");
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();

  const offset = useRef(0);

  const handleChange = (value: string) => {
    setSelected(value);
    offset.current = 0;
    startTransition(() => {
      setResource(getProducts({ type: value, offset: 0 }));
    });
  };

  return (
    <div>
      <Filter selected={selected} onChange={handleChange} />
      <Suspense fallback={<div>...loading</div>}>
        <ProductList resource={resource} />
      </Suspense>
    </div>
  );
}

export default App;
