// dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// style
import "./index.css";
// app
import App from "./App.tsx";
// context
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
