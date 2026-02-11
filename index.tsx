import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("Masa & Miel: Iniciando montaje...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Masa & Miel: No se encontró el elemento raíz 'root'.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Masa & Miel: Aplicación montada.");
  } catch (error) {
    console.error("Masa & Miel: Error al montar:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif;">
        <h2>Error al cargar la panadería</h2>
        <pre style="background: #f2e8e5; padding: 10px; margin-top: 20px;">${error}</pre>
      </div>
    `;
  }
}