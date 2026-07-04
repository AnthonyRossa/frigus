import "./ProductTracing.css";
import { useState } from "react";
import AddBatchForm from "../AddBatchForm/AddBatchForm";

export default function ProductTracing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBatch = (batchData) => {
    console.log("Batch data submitted", batchData);

    // To-do: Add API calls here to save the batch info

    setIsModalOpen(false);
  };

  return (
    <>
      <h3 className="traceability__title">Traceability</h3>
      <button
        className="traceability__add-batch-button"
        onClick={() => setIsModalOpen(true)}
      >
        Add Batch
      </button>

      {isModalOpen && (
        <AddBatchForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBatch}
        />
      )}
    </>
  );
}
