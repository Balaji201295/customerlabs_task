// SchemaList.js
import React from "react";
import { MdRemove } from "react-icons/md";
import { availableSchemas } from "../constants";

const SchemaList = ({ insideSchemas, handleRemoveSchema }) => {
  return (
    <div className="flex flex-col justify-start items-stretch gap-3 border-2 border-blue-200 max-h-[150px] overflow-auto p-3 my-4">
      {insideSchemas.map((schema, index) => (
        <div key={index} className="flex justify-start items-center">
          <div className="border p-2 w-full">
            {availableSchemas.find((s) => s.value === schema)?.label}
          </div>
          <button
            type="button"
            onClick={() => handleRemoveSchema(index)}
            className="ml-2"
          >
            <MdRemove size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SchemaList;
