// SaveSegment.js
import axios from "axios";
import React, { useState, useCallback } from "react";
import { MdOutlineArrowLeft } from "react-icons/md";
import { availableSchemas } from "../constants";
import SchemaList from "./SchemaList";
import SchemaSelector from "./SchemaSelector";

const SaveSegment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [outsideSchema, setOutsideSchema] = useState("");
  const [insideSchemas, setInsideSchemas] = useState([]);
  const [errors, setErrors] = useState({ segmentName: "", schema: "" });

  const resetForm = useCallback(() => {
    setSegmentName("");
    setOutsideSchema("");
    setInsideSchemas([]);
    setShowPopup(false);
    setErrors({ segmentName: "", schema: "" });
  }, []);

  const handleAddSchema = useCallback(() => {
    if (outsideSchema) {
      setInsideSchemas((prev) => [...prev, outsideSchema]);
      setOutsideSchema("");
      setErrors((prev) => ({ ...prev, schema: "" }));
    }
  }, [outsideSchema]);

  const handleRemoveSchema = useCallback((index) => {
    setInsideSchemas((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSaveSegment = useCallback(async () => {
    let hasError = false;
    const newErrors = { segmentName: "", schema: "" };

    if (!segmentName.trim()) {
      newErrors.segmentName = "Segment name is required";
      hasError = true;
    }

    if (!insideSchemas.length) {
      newErrors.schema = "At least add minimum one schema";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    const data = {
      segment_name: segmentName,
      schema: insideSchemas.map((schema) => {
        const selectedSchema = availableSchemas.find((s) => s.value === schema);
        return { [schema]: selectedSchema ? selectedSchema.label : schema };
      }),
    };

    const webhookUrl =
      "https://webhook.site/a6d5371f-8c4a-4160-824e-04a0be6c965d";
    try {
      await axios.post(webhookUrl, data);
      resetForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }, [segmentName, insideSchemas, resetForm]);

  return (
    <section className="w-full max-w-[1140px] mx-auto p-4">
      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="bg-[#39aebc] text-white p-2 rounded capitalize"
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
          <div className="popup-content p-6">
            <div className="relative">
              <label htmlFor="segmentName">Enter the Name of the Segment</label>
              <input
                type="text"
                value={segmentName}
                onChange={(e) => {
                  setSegmentName(e.target.value);
                  if (e.target.value.trim())
                    setErrors((prev) => ({ ...prev, segmentName: "" }));
                }}
                placeholder="Name of the Segment"
                className="border-2 border-gray-300 p-2 my-4 rounded w-full"
              />
              {errors.segmentName && (
                <p className="absolute -bottom-1 left-0 text-xs mt-1 text-red-500">
                  {errors.segmentName}
                </p>
              )}
            </div>
            <div>
              {insideSchemas.length > 0 && (
                <SchemaList
                  insideSchemas={insideSchemas}
                  handleRemoveSchema={handleRemoveSchema}
                />
              )}

              <SchemaSelector
                outsideSchema={outsideSchema}
                setOutsideSchema={setOutsideSchema}
                insideSchemas={insideSchemas}
                handleAddSchema={handleAddSchema}
                error={errors.schema}
              />
            </div>
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
              onClick={resetForm}
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
