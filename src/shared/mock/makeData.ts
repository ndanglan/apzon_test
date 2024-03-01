import { TInfo, TProduct } from "@/types/product.type";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

const range = (len: number) => {
 const arr: number[] = [];
 for (let i = 0; i < len; i++) {
  arr.push(i);
 }
 return arr;
};

const newProduct = (): TProduct => {
 return {
  id: faker.string.uuid(),
  amount: faker.number.int({
   min: 1,
   max: 100,
  }),
  code: `${faker.random.alphaNumeric(3)}${faker.random.alphaNumeric(1)}`,
  name: faker.commerce.productName(),
  singlePrice: +faker.commerce.price(),
  total: 0,
 };
};

export function makeData(...lens: number[]): TInfo {
 const makeDataLevel = (depth = 0): TProduct[] => {
  const len = lens[depth]!;
  return range(len).map((d, index): TProduct => {
   return {
    ...newProduct(),
    id: `${index + 1}`,
    total: newProduct().amount * newProduct().singlePrice,
   };
  });
 };

 return {
  code: `${faker.random.alphaNumeric(5)}${faker.random.alphaNumeric(1)}`,
  name: faker.company.name(),
  date: dayjs().format("YYYY-MM-DD"),
  products: makeDataLevel(),
 };
}

export function makeCustomerCode(...lens: number[]) {
 const makeDataLevel = (depth = 0): string[] => {
  const len = lens[depth]!;
  return range(len).map((d, index): string => {
   return `${faker.random.alphaNumeric(5)}${faker.random.alphaNumeric(1)}`;
  });
 };

 return makeDataLevel();
}
