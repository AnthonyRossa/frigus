import availableProducts from "../utils/products.json";

export const getProductName = (productId) => {
    const product = availableProducts.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

