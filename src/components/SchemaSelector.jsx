// SchemaSelector.js
import React, { useMemo } from "react";
import { availableSchemas } from "../constants";

const SchemaSelector = ({
  outsideSchema,
  setOutsideSchema,
  insideSchemas,
  handleAddSchema,
  error,
}) => {
  const availableOptions = useMemo(
    () =>
      availableSchemas.map((availableSchema) => (
        <option
          key={availableSchema.value}
          value={availableSchema.value}
          disabled={insideSchemas.includes(availableSchema.value)}
        >
          {availableSchema.label}
        </option>
      )),
    [insideSchemas]
  );

  return (
    <div className="flex flex-col justify-start items-start gap-3 my-4">
      <select
        value={outsideSchema}
        onChange={(e) => setOutsideSchema(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Add schema to segment</option>
        {availableOptions}
      </select>
      {error && <p className="text-xs mt-1 text-red-500">{error}</p>}
      <button
        type="button"
        onClick={handleAddSchema}
        className="ml-2 text-[#39aebc] rounded"
        disabled={!outsideSchema}
      >
        + Add New Schema
      </button>
    </div>
  );
};

export default SchemaSelector;
