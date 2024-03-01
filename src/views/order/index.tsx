import {
 AutoComplete,
 Button,
 DatePicker,
 Form,
 Input,
 Typography,
} from "antd";
import { memo, useMemo } from "react";

import DataTable from "@/components/data-table";
import { useAppSelector } from "@/redux/hooks";
import { appSelector } from "@/redux/slices/app/appSlice";
import { ETab } from "@/shared/constants/app.enum";
import useProductComposable from "@/shared/hooks/useProductComposable";
import { formatPrice } from "@/shared/utils/format";
import { TInfo, TProduct } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";

const OrderTab = () => {
 const { currentSideBarTab } = useAppSelector(appSelector);
 const [form] = Form.useForm<Omit<TInfo, "products">>();

 const { customerCode, data, onSubmit, setData } = useProductComposable({
  form,
  key: "orderData",
 });

 const columns = useMemo<ColumnDef<TProduct>[]>(
  () => [
   {
    accessorKey: "id",
    header: () => <span>#</span>,
    meta: {},
    maxSize: 10,
   },
   {
    accessorKey: "code",
    id: "code",
    header: () => <span>Mã mặt hàng</span>,
    accessorFn: (row) => <span className="uppercase">{row.code}</span>,
    meta: {},
    maxSize: 10,
   },
   {
    accessorKey: "name",
    id: "name",
    header: () => <span>Tên mặt hàng</span>,
    meta: {},
    maxSize: 40,
   },
   {
    accessorKey: "amount",
    id: "amount",
    header: () => <span>Số lượng</span>,
    meta: {
     editable: true,
    },
    maxSize: 10,
   },
   {
    accessorKey: "singlePrice",
    id: "singlePrice",
    header: () => <span>Đơn giá (VND)</span>,
    meta: {
     editable: true,
    },
    enableResizing: false, //disable resizing for just this column
    maxSize: 10,
   },
   {
    id: "total",
    header: () => <span>Thành tiền (VND)</span>,
    accessorFn: (row) => row.amount * row.singlePrice,
    cell: ({ row }) => (
     <span className="inline-block w-full">{`${formatPrice(
      `${
       +(row.getValue("singlePrice") as string) *
       +(row.getValue("amount") as number)
      }`,
     )}`}</span>
    ),
    maxSize: 20,
   },
  ],
  [],
 );

 return (
  <div className={currentSideBarTab === ETab.ORDER ? "block" : "hidden"}>
   <Typography.Title level={1} className="mb-4">
    Đơn bán hàng
   </Typography.Title>
   <Form
    form={form}
    labelCol={{
     span: 8,
    }}
    layout="horizontal"
    className="flex items-start justify-between max-w-[60%] gap-4">
    <div className="flex-1">
     <Form.Item
      label="Mã khách hàng"
      className="w-full"
      name={"code"}
      rules={[{ required: true, message: "Hãy chọn mã khách hàng" }]}>
      <AutoComplete
       options={customerCode.map((item) => ({
        value: item,
        label: item,
       }))}
       placeholder="Nhập mã khách hàng"
      />
     </Form.Item>
     <Form.Item
      label="Tên khách hàng"
      className="w-full"
      name={"name"}
      rules={[{ required: true, message: "Hãy nhập tên khách hàng" }]}>
      <Input placeholder="Nhập tên khách hàng" />
     </Form.Item>
    </div>
    <div className="flex-1">
     <Form.Item
      label="Ngày chứng từ"
      className="w-full"
      name={"date"}
      rules={[{ required: true, message: "Hãy chọn ngày chứng từ" }]}>
      <DatePicker className="w-full" placeholder="Chọn ngày chứng từ" />
     </Form.Item>
     <Form.Item label="Tổng tiền" className="w-full" name="total">
      <Input disabled className="!bg-white disabled:text-black" />
     </Form.Item>
    </div>
   </Form>
   <DataTable onChangeData={setData} columns={columns} data={data} />
   <div className="mt-2 flex items-center gap-2 w-full">
    <Button
     onClick={onSubmit}
     htmlType="submit"
     type="primary"
     className="w-[10rem] bg-blue-500">
     Lưu
    </Button>
    <Button className="w-[10rem]">Huỷ</Button>
   </div>
  </div>
 );
};

export default memo(OrderTab);
