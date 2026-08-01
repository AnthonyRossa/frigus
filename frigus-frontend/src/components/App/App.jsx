import "./App.css";
import React from "react";
import ProductTracing from "../ProductTracing/ProductTracing";
import { BatchProvider } from "../../contexts/BatchContext";

export default function App() {
  return (
    <>
      <BatchProvider>
        <ProductTracing />
      </BatchProvider>
    </>
  );
}
