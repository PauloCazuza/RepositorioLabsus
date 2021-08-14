import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./contexts/auth.js";
import Rotas from "./Rotas";
import "./estiloGlobal.css";

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
