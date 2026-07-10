import "./ProductTracing.css";
import { useState } from "react";
import AddBatchForm from "../AddBatchForm/AddBatchForm";
import api from "../../utils/api";

export default function ProductTracing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddBatch = async (batchData) => {
    setLoading(true);
    setError(null);

    try {
      const savedBatch = await api.createBatch(batchData);

      setBatches((prevBatches) => [savedBatch, ...prevBatches]);

      console.log("Batch saved successfully:", savedBatch);
      setIsModalOpen(false);
    } catch (err) {
      console.log("Error saving batch:", err);
      setError(err.message || "Failed to save batch");
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
