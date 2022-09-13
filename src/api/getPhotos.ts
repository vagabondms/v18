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
  let status = "pending"; // 최초의 상태
  let result: Photos;

  // 프로미스 객체 자체
  let suspender = promise.then(
    (r) => {
      status = "success"; // 성공으로 완결시 success로
      if (r) {
        result = r;
      }
    },
    (e) => {
      status = "error"; // 실패로 완결시 error로
      result = e;
    }
  );

  // 위의 Suspense For Data Fetching 예제에서의 read() 메소드입니다.
  // 위 함수의 로직을 클로저삼아, 함수 밖에서 프로미스의 진행 상황을 읽는 인터페이스가 된다
  return {
    read() {
      if (status === "pending") {
        throw suspender; // 펜딩 프로미스를 throw 하면 Suspense의 Fallback UI를 보여준다
      } else if (status === "error") {
        throw result; // Error을 throw하는 경우 ErrorBoundary의 Fallback UI를 보여준다
      } else if (status === "success") {
        return result; // 결과값을 리턴하는 경우 성공 UI를 보여준다
      }
    },
  };
}

export { getPhotos };
