import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

const unsplash = createApi({
  accessKey: "R7N1_coEu5U6OuR46YDTvJmYybC8vawg3imRi1uC1Xk",
});

interface GetProductsProps {
  keyword: string;
}

export const getPhotos1 = async ({ keyword }: GetProductsProps) => {
  const response = await unsplash.search.getPhotos({
    query: keyword,
    perPage: 30,
  });
  return response.response;
};

const getPhotos = ({ keyword }: GetProductsProps) => {
  const productPromise = unsplash.search
    .getPhotos({
      query: keyword,
      perPage: 30,
    })
    .then((response) => response.response)
    .catch((e) => {
      throw e;
    });

  return {
    products: wrapPromise(productPromise),
  };
};

function wrapPromise(promise: Promise<Photos | undefined>) {
  let status = "pending";
  let result: Photos;

  let suspender = promise.then(
    (r) => {
      status = "success";
      if (r) {
        result = r;
      }
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

export { getPhotos };
