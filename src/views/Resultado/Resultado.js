import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Check from "@material-ui/icons/Check";

import { useParams } from "react-router-dom";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

import firebase from "../../config/firebase";

const dashboardRoutes = [];

const db = firebase.firestore().collection("trabalhos");

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const [listaDeTrab, setListaDeTrab] = useState(null);
  const [inputFilter, setInputFilter] = useState("");
  const [checked, setChecked] = useState([]);
  let { titulo } = useParams();
  const [pesquisa, setPesquisa] = useState(titulo);

  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    receberDoBD();
  }, []);

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  function receberDoBD(parametro = titulo) {
    setListaDeTrab(null);
    setPesquisa(parametro);

    const buscaPorTitulo = checked.indexOf("TITULO") > -1;
    const buscaPorAutor = checked.indexOf("AUTOR") > -1;
    const buscaPorPalavraChave = checked.indexOf("PALAVRA-CHAVE") > -1;

    db.get()
      .then(async (resultado) => {
        let listaDeTrab = [];
        if (parametro) parametro = parametro.toUpperCase();

        await resultado.docs.forEach((doc) => {
          console.log(doc.data())
          console.log(doc.data().PalavrasChave)

          if (parametro && buscaPorTitulo && doc.data().Titulo.toUpperCase().includes(parametro)) {
            listaDeTrab.push({
              id: doc.id,
              ...doc.data(),
            });
          } else if (buscaPorAutor && doc.data().Autores.toUpperCase().includes(parametro)) {
            listaDeTrab.push({
              id: doc.id,
              ...doc.data(),
            });
          } else if (buscaPorPalavraChave && doc.data().PalavrasChave && doc.data().PalavrasChave.some(substring => substring.toUpperCase().includes(parametro))) {
            listaDeTrab.push({
              id: doc.id,
              ...doc.data(),
            });
          }

          if (!buscaPorTitulo && !buscaPorAutor && !buscaPorPalavraChave)
            listaDeTrab.push({
              id: doc.id,
              ...doc.data(),
            });
        });

        setListaDeTrab(listaDeTrab);
      })
      .catch((erro) => {
        alert("Problema de Conexão");
        console.log(erro);
      });
  }

  function validaFiltros() {
    const buscaPorTitulo = checked.indexOf("TITULO") > -1;
    const buscaPorAutor = checked.indexOf("AUTOR") > -1;
    const buscaPorPalavraChave = checked.indexOf("PALAVRA-CHAVE") > -1;

    return buscaPorTitulo || buscaPorAutor || buscaPorPalavraChave || inputFilter.trim();
  }

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Repositório LABSUS"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        style={{ height: "50vh" }}
        image={require("assets/img/landing-bg.jpg")}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            onChange={(e) => setInputFilter(e.target.value)}
            placeholder="Titulo, Autor, Palavra-Chave..."
            style={{
              width: "50%",
              height: "8vh",
              borderRadius: "50px",
              padding: "5px",
              fontSize: "3vh",
              border: "solid",
              borderColor: "#67668B",
            }}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  onClick={() => handleToggle("TITULO")}
                  checked={checked.indexOf("TITULO") !== -1 ? true : false}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                  }}
                />
              }
              classes={{ label: classes.label, root: classes.labelRoot }}
              style={{ color: "black" }}
              label="Titulo"
            />
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  onClick={() => handleToggle("AUTOR")}
                  checked={checked.indexOf("AUTOR") !== -1 ? true : false}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                  }}
                />
              }
              classes={{ label: classes.label, root: classes.labelRoot }}
              style={{ color: "black" }}
              label="Autor"
            />
            <FormControlLabel
              control={
                <Checkbox
                  tabIndex={-1}
                  onClick={() => handleToggle("PALAVRA-CHAVE")}
                  checked={checked.indexOf("PALAVRA-CHAVE") !== -1 ? true : false}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.checkRoot
                  }}
                />
              }
              classes={{ label: classes.label, root: classes.labelRoot }}
              style={{ color: "black" }}
              label="Palavras Chave"
            />
            <Button
              color="primary"
              round
              onClick={() => validaFiltros() ? receberDoBD(inputFilter) : alert("Preencha o campo de pesquisa ou escolha um filtro.")}
            >
              PESQUISAR
            </Button>
          </div>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection listaDeTrab={listaDeTrab} titulo={pesquisa} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
