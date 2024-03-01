import { TProduct } from "@/types/product.type";
import {
 ColumnDef,
 RowData,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 getPaginationRowModel,
 useReactTable,
} from "@tanstack/react-table";
import Column from "./Column";

declare module "@tanstack/react-table" {
 interface TableMeta<TData extends RowData> {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
 }
 interface ColumnMeta<TData extends RowData, TValue> {
  editable?: boolean;
  className?: string;
 }
}

type Props = {
 data: any[];
 columns: ColumnDef<TProduct, any>[];
 onChangeData: (data: any) => void;
};

const DataTable = ({ data, columns, onChangeData }: Props) => {
 const table = useReactTable({
  data,
  columns,
  defaultColumn: Column,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  meta: {
   updateData: (rowIndex, columnId, value: any) => {
    onChangeData((old: any) =>
     old.map((row: any, index: any) => {
      if (index === rowIndex) {
       const newTotal =
        +value *
        (columnId === "singlePrice"
         ? +old[rowIndex]["amount"]
         : +old[rowIndex]["singlePrice"]);
       return {
        ...old[rowIndex]!,
        [columnId]: value,
        total: newTotal,
       };
      }
      return row;
     }),
    );
   },
  },
  debugTable: true,
 });
 return (
  <div className="w-full p-4 border border-solid border-[#000] rounded-lg">
   <table className="table w-full">
    <thead>
     {table.getHeaderGroups().map((headerGroup) => (
      <tr className="table-headers" key={headerGroup.id}>
       {headerGroup.headers.map((header) => {
        return (
         <th
          className="table-header"
          key={header.id}
          style={{ width: `${header.getSize()}%` }}>
          {header.isPlaceholder ? null : (
           <div className="w-full max-w-full flex justify-start">
            {flexRender(header.column.columnDef.header, header.getContext())}
           </div>
          )}
         </th>
        );
       })}
      </tr>
     ))}
    </thead>
    <tbody>
     {table.getRowModel().rows.map((row) => {
      return (
       <tr key={row.id}>
        {row.getVisibleCells().map((cell) => {
         return (
          <td key={cell.id}>
           {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
         );
        })}
       </tr>
      );
     })}
    </tbody>
   </table>
  </div>
 );
};

export default DataTable;
