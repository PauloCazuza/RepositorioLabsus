import React, {useContext} from "react";
import AuthContext from "./contexts/auth.js";
import { createBrowserHistory } from "history";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// import "@assets/scss/material-kit-react.scss";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Inicio from "views/Inicio/Inicio.js";
import Resultado from "views/Resultado/Resultado.js";
import ResultadoTrabalho from "views/ResultadoTrabalho/ResultadoTrabalho.js";
import EntradaDeDados from "views/EntradaDeDados/EntradaDeDados";
var hist = createBrowserHistory();

export default function Rotas() {
    const { logado } = useContext(AuthContext);
    console.log(logado);
  
    if (logado) {
      return (
        <Router history={hist}>
          <Switch>
            <Route path="/Resultado/:titulo" component={Resultado} />
            <Route path="/Resultado" component={Resultado} />
            <Route path="/ResultadoTrabalho/:id" component={ResultadoTrabalho} />
            <Route path="/EntradaDeDados" component={EntradaDeDados} />
            <Route path="/Inicio" component={Inicio} />
            <Route path="/" component={EntradaDeDados} />
          </Switch>
        </Router>
      );
    }
  
    return (
      <Router history={hist}>
        <Switch>
          <Route path="/login-page" component={LoginPage} />
          <Route path="/Resultado/:titulo" component={Resultado} />
          <Route path="/Resultado" component={Resultado} />
          <Route path="/ResultadoTrabalho/:id" component={ResultadoTrabalho} />
          {/* <Route path="/EntradaDeDados" component={EntradaDeDados} /> */}
          <Route path="/" component={Inicio} />
        </Switch>
      </Router>
    );
  }