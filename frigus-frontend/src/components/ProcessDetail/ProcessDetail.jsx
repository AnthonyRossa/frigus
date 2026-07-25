import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function ProcessDetail({ batch }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (batch && batch.productId) {
      const fetchProduct = async () => {
        try {
          const data = await api.getProductById(batch.productId);
          setProduct(data);
        } catch (err) {
          console.error("Failed to fetch product details:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setProduct(null);
      setLoading(false);
    }
  }, [batch]);

  const renderSteps = (steps, level = 0) => {
    return (
      <div style={{ marginLeft: level * 20, marginBottom: "15px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          <tbody>
            {steps.map((step, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  {step.param}:
                </td>
                <td style={{ padding: "8px", color: "#333" }}>
                  {step.value}{" "}
                  <span style={{ color: "#888", fontSize: "0.85rem" }}>
                    {step.unit || ""}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) return <div>Loading process details...</div>;
  if (!product) return <div>Product details not found.</div>;

  return (
    <div className="process-detail-container">
      <h3 className="process-detail-title">
        Process Traceability: {product.name}
      </h3>
      <p className="process-detail-batch-id">Batch: {batch.name}</p>

      {product.processes.map((proc) => (
        <div key={proc._id} className="process-section">
          <h4 className="process-section-title">{proc.name}</h4>
          {proc.description && (
            <p
              style={{
                fontSize: "0.9rem",
                color: "#666",
                marginBottom: "10px",
              }}
            >
              {proc.description}
            </p>
          )}
          {renderSteps(proc.steps)}
        </div>
      ))}
    </div>
  );
}
