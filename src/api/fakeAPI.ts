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

const getProducts = async ({
  type,
  offset = 0,
}: GetProducts): Promise<Products[]> => {
  return await new Promise((res) => {
    setTimeout(() => {
      res(getFakeData());
    }, generateRandomCount());
  });
};

export { getProducts };
