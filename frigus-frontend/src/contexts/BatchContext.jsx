import { createContext, useContext, useState } from 'react';

const BatchContext = createContext();

export function BatchProvider({ children }) {
  const [selectedBatch, setSelectedBatch] = useState(null);

  return (
    <BatchContext.Provider value={{ selectedBatch, setSelectedBatch }}>
      {children}
    </BatchContext.Provider>
  );
}

export function useBatch() {
  const context = useContext(BatchContext);
  if (!context) {
    throw new Error('useBatch must be used within a BatchProvider');
  }
  return context;
}