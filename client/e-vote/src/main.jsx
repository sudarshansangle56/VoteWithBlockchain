// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FpjsProvider, FingerprintJSPro } from "@fingerprintjs/fingerprintjs-pro-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "YOUR_PUBLIC_API_KEY", // Replace with your actual Fingerprint public key
        endpoint: [FingerprintJSPro.defaultEndpoint],
        scriptUrlPattern: [FingerprintJSPro.defaultScriptUrlPattern],
        // region: "ap" // (optional, based on your region)
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
);
