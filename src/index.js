import React from "react";
import { createRoot } from "react-dom/client"; // Importe createRoot
import App from "./App";

// Crie a raiz da aplicação
const root = createRoot(document.getElementById("root"));

// Renderize a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);