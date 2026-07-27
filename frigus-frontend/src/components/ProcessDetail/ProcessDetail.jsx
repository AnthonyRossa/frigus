import { useState, useEffect } from "react";
import api from "../../utils/api";
import "./ProcessDetail.css"

export default function ProcessDetail({ batch }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!batch || !batch.productId) {
      setProduct(null);
      return;
    }
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProductById(batch.productId);
        setProduct(data);
      } catch (err) {
        setError("Failed to load process details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [batch]);

  if (!batch) {
    return (
      <div className="traceability__empty-state">
        <p>Click on a row to view process details.</p>
      </div>
    );
  }

  if (loading)
    return <div className="traceability__empty-state">Loading details...</div>;
  if (error) return <div className="traceability__error-message">{error}</div>;
  if (!product)
    return (
      <div className="traceability__empty-state">
        Product details not found.
      </div>
    );

  const renderSteps = (steps) => {
    if (!steps || steps.length === 0) return <p>No steps defined.</p>;

    return (
      <table>
        <tbody>
          {steps.map((step, index) => (
            <tr key={index}>
              <td>{step.param}:</td>
              <td>
                {step.value} <span>{step.unit || ""}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="process-detail__container">
      <h3 className="process-detail__title">
        Process Traceability: {product.name}
      </h3>
      <p className="process-detail__batch-id">
        Batch: <p>{batch.name}</p>
      </p>

      {product.processes && product.processes.length > 0 ? (
        product.processes.map((proc) => (
          <div key={proc._id} className="process-detail__section">
            <p className="process-detail__section-title">{proc.name}</p>
            {proc.description && <p>{proc.description}</p>}
            {renderSteps(proc.steps)}
          </div>
        ))
      ) : (
        <p>No processes defined for this product.</p>
      )}
    </div>
  );
}
