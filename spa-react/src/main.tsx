import React from "react";
import { AuthProvider } from "@magalucloud/sdk-idmagalu-react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider
      clientId="UrdgxWTGxJIqkfq92S3cRy3i5Kh2SD9aWLSXaIbxIP4"
      redirectUri="http://localhost:3000"
      getTokenSilently={true}
      useRefreshTokens={true}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);
