import "./normalize.css";

import Tab from "./components/features/recent/Tab";

import { Suspense, useRef, useState, useTransition } from "react";
import { getPhotos } from "./api/getPhotos";
import ProductList from "./components/features/recent/ProductList";
import Header from "./components/features/recent/Header";
import TabDetail from "./components/features/recent/TabDetail";
import GlobalLoader from "./components/common/GlobalLoader";

const initialResource = getPhotos({ keyword: "Best of Behance" });

function App() {
  const [selected, setSelected] = useState<string>("Best of Behance");
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();

  const offset = useRef(0);

  const handleChange = (value: string) => {
    setSelected(value);
    offset.current = 0;
    startTransition(() => {
      setResource(getPhotos({ keyword: value }));
    });
  };

  return (
    <div>
      <GlobalLoader isLoading={isPending} />
      <Header />
      <Tab selected={selected} onChange={handleChange} />
      <TabDetail selected={selected} />
      <Suspense fallback={<div>...loading</div>}>
        <ProductList resource={resource} />
      </Suspense>
    </div>
  );
}

export default App;
