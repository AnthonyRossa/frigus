import { useBatch } from "../../contexts/BatchContext";
import { getProductName } from "../../utils/utils";
import availableProducts from "../../utils/products.json";
import "./ProductInfo.css";
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function ProductInfo({ onBatchUpdate }) {
  const { selectedBatch, setSelectedBatch } = useBatch();
  const [productDetails, setProductDetails] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const hasSavedProductionData =
    selectedBatch &&
    selectedBatch.productionData &&
    Object.keys(selectedBatch.productionData).length > 0;

  useEffect(() => {
    if (!selectedBatch) {
      setProductDetails(null);
      setFormData({});
      setError(null);
      return;
    }

    const product = availableProducts.find(
      (p) => p.id === selectedBatch.productId,
    );
    setProductDetails(product);

    const initialData = {};
    if (product?.productionSteps) {
      product.productionSteps.forEach((step) => {
        initialData[step.key] =
          selectedBatch.productionData?.[step.key] ??
          selectedBatch[step.key] ??
          "";
      });
    }
    setFormData(initialData);
  }, [selectedBatch]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (!selectedBatch || !productDetails) return;

    setIsSaving(true);
    try {
      const updatePayload = {
        productionData: {
          ...formData,
        },
      };

      const updatedBatch = await api.updateBatch(
        selectedBatch._id,
        updatePayload,
      );

      if (onBatchUpdate) {
        onBatchUpdate(updatedBatch);
      } else {
        setSelectedBatch(updatedBatch);
      }
      console.log("Production details saved successfully!", updatedBatch);
    } catch (err) {
      console.error("Failed to save details:", err);
      setError("Failed to save production details. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!selectedBatch) {
    return (
      <div className="product-info">
        <p className="product-info__empty">Select a batch to view details</p>
      </div>
    );
  }

  if (!productDetails) {
    return <div className="product-info">Product details not found.</div>;
  }

  return (
    <div className="product-info">
      <div className="product-info__header">
        <span className="product-info__header-label">Batch details</span>
        <h3 className="product-info__title">{productDetails.name}</h3>
        <p className="product-info__batch">Batch: {selectedBatch.batchNumber}</p>
      </div>

      <div className="product-info__section">
        <h4>Production Data</h4>

        {productDetails.productionSteps &&
        productDetails.productionSteps.length > 0 ? (
          <div className="product-info__steps">
            {productDetails.productionSteps.map((step) => (
              <div key={step.key} className="product-info__step-group">
                <label htmlFor={step.key} className="product-info__label">
                  {step.label}
                </label>
                {hasSavedProductionData ? (
                  <p className="product-info__value">
                    {selectedBatch.productionData?.[step.key] ?? "-"}
                  </p>
                ) : (
                  <input
                    id={step.key}
                    type={step.type}
                    className="product-info__input"
                    step="0.001"
                    placeholder={step.placeholder}
                    value={formData[step.key] || ""}
                    onChange={(e) => handleInputChange(step.key, e.target.value)}
                  />
                )}
              </div>
            ))}

            {!hasSavedProductionData && (
              <button
                className="product-info__save-btn"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Production Data"}
              </button>
            )}
          </div>
        ) : (
          <p className="product-info__no-steps">
            No specific production steps defined for this product.
          </p>
        )}
      </div>
      <p className="product-info__time">
        Registered at:{" "}
        {selectedBatch.createdAt
          ? new Date(selectedBatch.createdAt).toLocaleString()
          : "-"}
      </p>      {selectedBatch.savedAt && (
        <p className="product-info__time">
          Saved at: {" "}
          {new Date(selectedBatch.savedAt).toLocaleString()}
        </p>
      )}    </div>
  );
}
