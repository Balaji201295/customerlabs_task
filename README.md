<!-- import axios from "axios";
import React, { useState } from "react";
import { MdOutlineArrowLeft, MdRemove } from "react-icons/md";

const SaveSegment = () => {
const [showPopup, setShowPopup] = useState(false);
const [segmentName, setSegmentName] = useState("");
const [schemas, setSchemas] = useState([]);
const [schemaCount, setSchemaCount] = useState(1); // State to track schema count

const availableSchemas = [
{ label: "First Name", value: "first_name" },
{ label: "Last Name", value: "last_name" },
{ label: "Gender", value: "gender" },
{ label: "Age", value: "age" },
{ label: "Account Name", value: "account_name" },
{ label: "City", value: "city" },
{ label: "State", value: "state" },
];

const placeholderMapping = {
first_name: "Enter your first name",
last_name: "Enter your last name",
gender: "Enter your gender",
age: "Enter your age",
account_name: "Enter your account name",
city: "Enter your city",
state: "Enter your state",
};

const handleSchemaChange = (index, value) => {
const newSchemas = [...schemas];

    // Initialize new schema object if it doesn't exist
    if (!newSchemas[index]) {
      newSchemas[index] = { selectedSchema: "", inputValue: "" };
    }

    newSchemas[index].selectedSchema = value;
    setSchemas(newSchemas);

};

const handleInputChange = (index, value) => {
const newSchemas = [...schemas];
newSchemas[index].inputValue = value;
setSchemas(newSchemas);
};

const handleAddSchema = () => {
const defaultSchema = availableSchemas.find(
(schema) => !schemas.some((s) => s.selectedSchema === schema.value)
);
if (defaultSchema) {
setSchemas([
...schemas,
{ selectedSchema: defaultSchema.value, inputValue: "" },
]);
}
};

const handleRemoveSchema = (index) => {
const newSchemas = schemas.filter((\_, i) => i !== index);
setSchemas(newSchemas);
};

const handleSaveSegment = async () => {
const data = {
segment_name: segmentName,
schema: schemas.reduce((acc, current) => {
if (current.selectedSchema && current.inputValue) {
acc[current.selectedSchema] = current.inputValue;
}
return acc;
}, {}),
};
try {
const response = await axios.post("", data);
console.log("data:", response.data);
} catch (error) {
console.log("Error:", error.message);
}
};

const addNewSchemaDropdown = () => {
setSchemaCount(schemaCount + 1);
};

return (
<section className="w-full max-w-[1140px] mx-auto p-4">
<button
type="button"
onClick={() => setShowPopup(true)}
className="bg-blue-500 text-white p-2 rounded capitalize" >
save segment
</button>
<div
className={`popup-wrapper ${showPopup ? "show_popup" : "hide_popup"}`} >
<div className="popup-content">
<div className="w-full flex justify-start items-center bg-[#39aebc] p-4 text-white">
<MdOutlineArrowLeft fontSize={32} />
<h2 className="text-lg font-semibold w-full">Saving Segment</h2>
</div>
<div className="p-6">
<label htmlFor="segmentName">Enter the Name of the Segment</label>
<input
type="text"
value={segmentName}
onChange={(e) => setSegmentName(e.target.value)}
placeholder="Name of the Segment"
className="border-2 border-gray-300 p-2 my-4 rounded w-full"
/>

            {/* Render selected schemas inputs */}
            {schemas.map((schema, index) => (
              <div key={index} className="flex items-center">
                {schema.selectedSchema && (
                  <>
                    <input
                      type="text"
                      value={schema.inputValue}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={
                        placeholderMapping[schema.selectedSchema] ||
                        "Enter your input"
                      }
                      className="border-2 border-gray-300 p-2 rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSchema(index)}
                      className="ml-2"
                    >
                      <MdRemove size={20} />
                    </button>
                  </>
                )}
              </div>
            ))}

            {/* Render multiple add schema dropdowns */}
            {[...Array(schemaCount)].map((_, idx) => (
              <select
                key={idx}
                value={schemas[idx]?.selectedSchema || ""}
                onChange={(e) => handleSchemaChange(idx, e.target.value)}
                className="border p-2 my-4 w-full"
              >
                <option value="">Add schema to segment</option>
                {availableSchemas.map((schema) => (
                  <option
                    key={schema.value}
                    value={schema.value}
                    disabled={schemas.some(
                      (s) => s.selectedSchema === schema.value
                    )}
                  >
                    {schema.label}
                  </option>
                ))}
              </select>
            ))}

            <button type="button" onClick={addNewSchemaDropdown}>
              + Add New Schema
            </button>
          </div>
          <div className="bg-[#f6f6f6] p-6">
            <button
              type="button"
              onClick={handleSaveSegment}
              className="bg-[#39aebc] text-white p-2 rounded"
            >
              Save the Segment
            </button>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="bg-gray-200 text-red-400 p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>

);
};

export default SaveSegment; -->
