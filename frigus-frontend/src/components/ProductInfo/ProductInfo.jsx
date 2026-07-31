import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function ProcessDetail({ batch, product }) {
  const [logs, setLogs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!batch || !product) return;

    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProcessLogsByBatch(batch._id);
        const logsByStep = {};
        data.forEach((log) => {
          if (!logsByStep[log.processId._id])
            logsByStep[log.processId._id] = {};
          logsByStep[log.processId._id][log.stepId._id] = log.value;
        });
        setLogs(logsByStep);
      } catch (err) {
        setError("Failed to load process logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [batch, product]);

  const handleSave = async (processId, stepId, value) => {
    try {
      await api.createProcessLog({
        batchId: batch._id,
        processId,
        stepId,
        value,
      });
      setLogs((prev) => ({
        ...prev,
        [processId]: {
          ...prev[processId],
          [stepId]: value,
        },
      }));
    } catch (err) {
      setError("Failed to save process data.");
    }
  };

  if (!batch) {
    return <div>Select a batch to view its process details.</div>;
  }

  if (loading) return <div>Loading process logs...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  const renderSteps = (steps, processId) => {
    if (!Array.isArray(steps)) {
      return <p>No steps defined for this process.</p>;
    }
    if (!steps || steps.length === 0) return <p>No steps defined.</p>;

    return (
      <div>
        {steps.map((step) => (
          <div key={step._id} style={{ marginBottom: "10px" }}>
            <label>
              {step.param} ({step.unit || ""}):
            </label>
            <input
              type="text"
              value={logs[processId]?.[step._id] || ""}
              onChange={(e) => handleSave(processId, step._id, e.target.value)}
              placeholder={`Enter ${step.param}`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="process-detail-container">
      <h3 className="process-detail-title">Process: {product.name}</h3>
      <p className="process-detail-batch-id">
        Batch: <strong>{batch.name}</strong>
      </p>

      {product.processes &&
      Array.isArray(product.processes) &&
      product.processes.length > 0 ? (
        product.processes.map((proc) => (
          <div key={proc._id} className="process-section">
            <h4 className="process-section-title">{proc.name}</h4>
            {proc.description && <p>{proc.description}</p>}
            {renderSteps(proc.steps, proc._id)}
          </div>
        ))
      ) : (
        <p>No Processes defined for this product.</p>
      )}
    </div>
  );
}
