"use client";

import React, { createContext, useContext, useState } from 'react';

// Crea il contesto con un nome PascalCase
export const LoadContentContext = createContext();

// Componente Provider per il contesto
export function LoadingContextProvider({ children }) {
  const [loadingContent, setLoadingContent] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)
  
  return (
    <LoadContentContext.Provider value={{ loadingContent, setLoadingContent, isDeleted, setIsDeleted }}>
      {children}
    </LoadContentContext.Provider>
  );
}

// Hook personalizzato per usare il contesto
export const useLoadingContentContext = () => useContext(LoadContentContext);

