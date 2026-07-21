import "./ProductTracing.css";
import { useState, useEffect } from "react";
import AddBatchForm from "../AddBatchForm/AddBatchForm";
import api from "../../utils/api";
import { getProductName } from "../../utils/utils";

export default function ProductTracing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const data = await api.getBatches();
        setBatches(data);
      } catch (err) {
        console.error("Failed to load batches:", err);
        setError("Failed to load batches. Please try again.");
      }
    };

    fetchBatches();
  }, []);

  const handleAddBatch = async (batchData) => {
    setLoading(true);
    setError(null);

    try {
      const savedBatch = await api.createBatch(batchData);

      setBatches((prevBatches) => [savedBatch, ...prevBatches]);

      setIsModalOpen(false);
    } catch (err) {
      console.log("Error saving batch:", err);
      setError(err.message || "Failed to save batch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="traceability">
      {error && <div className="traceability__error-message">{error}</div>}
      <h3 className="traceability__title">Traceability</h3>
      <div className="traceability__controls">
        <button
          className="traceability__add-batch-button"
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Batch"}
        </button>
      </div>
      <div className="traceability__batches-list">
        {batches.length === 0 ? (
          <p>No batches found. Add one above!</p>
        ) : (
          <table className="traceability__table">
            <thead>
              <tr>
                <th>Production Date</th>
                <th>Batch</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch._id}>
                  <td>
                    {batch.productionDate
                      ? new Date(batch.productionDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{batch.name}</td>
                  <td>{getProductName(batch.productId)}</td>
                  <td>{batch.quantity}</td>
                  <td>
                    {batch.createdAt
                      ? new Date(batch.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <AddBatchForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBatch}
        />
      )}
    </div>
  );
}
