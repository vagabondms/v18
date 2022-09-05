import { faker } from "@faker-js/faker";
import { Products } from "../models/product";

const generateRandomCount = () => {
  return Math.random() * 3000;
};

const getFakeData = () => {
  return Array(30)
    .fill(null)
    .map(() => {
      return {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        image: faker.image.abstract(600, 600, true),
        likes: parseInt(faker.random.numeric(Math.round(Math.random()) + 1)),
        views: parseInt(faker.random.numeric(Math.round(Math.random()) + 2)),
      };
    });
};

interface GetProducts {
  type: string;
  offset?: number;
}

const getProducts = ({ type, offset }: GetProducts) => {
  const productPromise = new Promise((res) => {
    setTimeout(() => {
      res(getFakeData());
    }, generateRandomCount());
  }); // 프로미스를 리턴

  return {
    products: wrapPromise(productPromise),
  };
};

function wrapPromise(promise: Promise<any>) {
  let status = "pending"; // 최초의 상태
  let result: Products[];

  // 프로미스 객체 자체
  let suspender = promise.then(
    (r) => {
      status = "success"; // 성공으로 완결시 success로
      result = r;
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
      console.log(status);
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

export { getProducts };
