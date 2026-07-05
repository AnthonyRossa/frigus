import { useState } from "react";
import "./AddBatchForm.css";
import availableProducts from "../../utils/products.json";

export default function AddBatchForm({ onClose, onSubmit }) {
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    onSubmit(data);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={handleContentClick}>
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <h4 className="modal__title">Add New Batch</h4>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form-group">
            <label className="modal__form-label" htmlFor="product">
              Product
            </label>
            <select
              className="modal__form-input"
              type="text"
              id="product"
              name="product"
              required
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {availableProducts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal__form-group">
            <label className="modal__form-label" htmlFor="batchNumber">
              Batch Number
            </label>
            <input
              className="modal__form-input"
              type="text"
              id="batchNumber"
              name="batchNumber"
              required
              autoComplete="off"
            />
          </div>
          <div className="modal__form-group">
            <label className="modal__form-label" htmlFor="productionDate">
              Production Date
            </label>
            <input
              className="modal__form-input"
              type="date"
              id="productionDate"
              name="productionDate"
              required
              autoComplete="off"
            />
          </div>
          <div className="modal__form-group">
            <label className="modal__form-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="modal__form-input"
              type="number"
              id="quantity"
              name="quantity"
              required
              autoComplete="off"
            />
          </div>
          <div className="modal__actions">
            <button type="submit" className="modal__form-submit-button">
              Save Batch
            </button>
            <button
              type="button"
              className="modal__form-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
