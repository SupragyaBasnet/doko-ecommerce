import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext"; // Import ShopContextProvider

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root")); // Use createRoot instead of ReactDOM.createRoot
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
