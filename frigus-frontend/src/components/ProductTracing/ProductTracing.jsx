import "./ProductTracing.css";
import { useState } from "react";
import AddBatchForm from "../AddBatchForm/AddBatchForm";

export default function ProductTracing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddBatch = async (batchData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("mongodb://localhost:27017/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Add Authorization headers here later
        },
        body: JSON.stringify(batchData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save: ${response.statusText}`);
      }
      const savedBatch = await response.json();

      setBatches((prevBatches) => [savedBatch, ...prevBatches]);

      console.log("Batch saved successfully:", savedBatch);
      setIsModalOpen(false);
    } catch (err) {
      console.log("Error saving batch:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="traceability__title">Traceability</h3>
      <button
        className="traceability__add-batch-button"
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Batch"}
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
