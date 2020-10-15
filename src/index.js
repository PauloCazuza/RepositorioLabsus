import React from "react";
import ReactDOM from "react-dom";
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
import Teste from "views/EntradaDeDados/EntradaDeDados";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/Components" component={Components} />
      <Route path="/Resultado/:titulo" component={Resultado} />
      <Route path="/Resultado" component={Resultado} />
      <Route path="/ResultadoTrabalho/:id" component={ResultadoTrabalho} />
      <Route path="/EntradaDeDados" component={Teste} />
      <Route path="/" component={Inicio} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
