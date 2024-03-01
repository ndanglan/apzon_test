/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { TProduct } from "@/types/product.type";

const Column: Partial<ColumnDef<TProduct>> = {
 cell: ({
  getValue,
  row: { index },
  column: {
   id,
   columnDef: { meta },
   getSize,
  },
  table,
 }) => {
  const editable = meta?.editable;
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const ref = React.useRef<HTMLInputElement>(null);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
   table.options.meta?.updateData(index, id, value);
   if (value === "") {
    setValue("0");
   }
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
   setValue(initialValue);
  }, [initialValue]);

  return (
   <div className={` ${meta?.className ?? ""}`}>
    {editable ? (
     <input
      ref={ref}
      value={value as string}
      onChange={(e) => {
       const regex = /\d+/;

       // Extract the matching digits using the first match (group 0)
       const match = regex.exec(e.target.value);

       // Return the extracted digits, or an empty string if no match found
       setValue(match ? match[0] : "");
      }}
      onBlur={onBlur}
      className="bg-transparent focus:bg-white focus-within:bg-white"
     />
    ) : (
     <p>{(value as string) || 0}</p>
    )}
   </div>
  );
 },
};

export default Column;
