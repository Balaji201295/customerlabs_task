import axios from "axios";
import React, { useState } from "react";
import { MdOutlineArrowLeft, MdRemove } from "react-icons/md";

const SaveSegment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const availableSchemas = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleAddSchema = () => {
    setSchemas([...schemas, ""]);
  };

  const handleRemoveSchema = (index) => {
    const newSchemas = schemas.filter((_, i) => i !== index);
    setSchemas(newSchemas);
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({ selectedSchema: schema })),
    };
    try {
      const response = await axios.post("", data);
      console.log("data:", response.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <section className="w-full max-w-[1140px] mx-auto p-4">
      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white p-2 rounded capitalize"
      >
        save segment
      </button>
      <div
        className={`popup-wrapper ${showPopup ? "show_popup" : "hide_popup"}`}
      >
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
            <div className="h-full max-h-[200px] overflow-auto">
              {schemas.map((schema, index) => (
                <div key={index} className="flex items-center mb-3">
                  <select
                    value={schema}
                    onChange={(e) => {
                      const newSchemas = [...schemas];
                      newSchemas[index] = e.target.value;
                      setSchemas(newSchemas);
                    }}
                    className="border p-2 w-full"
                  >
                    <option value="">Select a schema</option>
                    {availableSchemas.map((availableSchema) => (
                      <option
                        key={availableSchema.value}
                        value={availableSchema.value}
                        disabled={schemas.includes(availableSchema.value)}
                      >
                        {availableSchema.label}
                      </option>
                    ))}
                  </select>
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
            <button
              type="button"
              onClick={handleAddSchema}
              className="bg-blue-500 text-white p-2 rounded my-4"
            >
              + Add New Schema
            </button>
          </div>
          <div className="bg-[#f6f6f6] flex justify-start items-center gap-6 p-6">
            <button
              type="button"
              onClick={handleSaveSegment}
              className="bg-[#39aebc] text-white py-3 px-4 rounded"
            >
              Save the Segment
            </button>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="bg-gray-200 text-red-400 py-3 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveSegment;
