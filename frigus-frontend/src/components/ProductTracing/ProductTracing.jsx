import "./ProductTracing.css";
import { useState, useEffect } from "react";
import AddBatchForm from "../AddBatchForm/AddBatchForm";
import ProductInfo from "../ProductInfo/ProductInfo";
import api from "../../utils/api";
import availableProducts from "../../utils/products.json"
import { getProductName } from "../../utils/utils";
import { BatchProvider, useBatch } from "../../contexts/BatchContext.jsx";

export default function ProductTracing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedBatch, setSelectedBatch } = useBatch();

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

  const handleRowClick = (batch) => {
    setSelectedBatch(batch);
  };

  return (
    <div className="traceability">
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
      {error && <div className="traceability__error-message">{error}</div>}

      <div className="traceability__main-content">
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
                  <th>Supervisor</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch._id} onClick={() => handleRowClick(batch)}>
                    <td>
                      {batch.productionDate
                        ? new Date(batch.productionDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{batch.batchNumber}</td>
                    <td>{getProductName(batch.productId, availableProducts)}</td>
                    <td>{batch.quantity}</td>
                    <td>
                      username
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="traceability__side-panel">
          <ProductInfo />
        </div>
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
