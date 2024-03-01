import { Dayjs } from "dayjs";

export type TProduct = {
 id: string;
 code: string;
 name: string;
 amount: number;
 singlePrice: number;
 total: number;
};

export type TInfo = {
 code: string;
 name: string;
 date: string;
 products: TProduct[];
};
