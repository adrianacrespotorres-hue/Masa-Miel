import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Masa & Miel: Iniciando montaje de la aplicación...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Masa & Miel: No se encontró el elemento raíz 'root' en el DOM.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Masa & Miel: Aplicación renderizada correctamente.");
  } catch (error) {
    console.error("Masa & Miel: Error crítico durante el renderizado:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; color: #3e2723;">
        <h1 style="font-serif">¡Ups! Algo salió mal al hornear la página.</h1>
        <p>Por favor, intenta recargar. Si el problema persiste, contacta a soporte.</p>
        <pre style="text-align: left; background: #f2e8e5; padding: 15px; border-radius: 8px; font-size: 12px; margin-top: 20px; overflow-x: auto;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
}