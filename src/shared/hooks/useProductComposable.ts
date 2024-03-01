import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
 appSelector,
 setOrderData,
 setShoppingData,
} from "@/redux/slices/app/appSlice";
import { TInfo, TProduct } from "@/types/product.type";
import { FormInstance } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { makeCustomerCode, makeData } from "../mock/makeData";
import dayjs from "dayjs";

const useProductComposable = ({
 form,
 key,
}: {
 form: FormInstance<Omit<TInfo, "products">>;
 key: "shoppingData" | "orderData";
}) => {
 const appStore = useAppSelector(appSelector);
 const dispatch = useAppDispatch();

 const [data, setData] = useState<TProduct[]>([]);

 const customerCode = useMemo(() => makeCustomerCode(10), []);

 const total = useMemo(
  () =>
   data.reduce((pre, cur) => {
    return pre + +cur.total;
   }, 0),
  [data],
 );

 const initData = useCallback(() => {
  const data = appStore[key] ?? makeData(10);
  setData(data.products);
  form.setFieldValue("name", data.name);
  form.setFieldValue("code", data.code);
  form.setFieldValue("date", dayjs(data.date));
 }, [form, key]);

 const onSubmit = async () => {
  try {
   await form.validateFields();
   const payload = {
    ...form.getFieldsValue(),
    products: data,
   };
   switch (key) {
    case "orderData":
     dispatch(setOrderData(payload));
     break;
    case "shoppingData":
     dispatch(setShoppingData(payload));
     break;

    default:
     break;
   }
  } catch (error) {
   console.log(error);
  }
 };

 useEffect(() => {
  form.setFieldValue("total", total);
 }, [total, form]);

 useEffect(() => {
  initData();
 }, [initData]);
 return {
  total,
  onSubmit,
  data,
  customerCode,
  setData,
 };
};

export default useProductComposable;
