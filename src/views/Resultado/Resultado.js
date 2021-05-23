import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useParams } from "react-router-dom";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
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
  let { titulo } = useParams();
  const [pesquisa, setPesquisa] = useState(titulo);

  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    receberDoBD();
  }, []);

  function receberDoBD(titulo = titulo) {
    setListaDeTrab(null);
    setPesquisa(titulo);

    db.get()
      .then(async (resultado) => {
        let listaDeTrab = [];
        if (titulo) titulo = titulo.toUpperCase();

        await resultado.docs.forEach((doc) => {
          if (titulo) {
            if (doc.data().Titulo.toUpperCase().includes(titulo))
              listaDeTrab.push({
                id: doc.id,
                ...doc.data(),
              });
          } else
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
            style={{
              width: "50%",
              height: "7vh",
              borderRadius: "50px",
              padding: "15px",
              fontSize: "3vh",
              border: "solid",
              borderColor: "#67668B",
            }}
          />
          <div style={{display: "flex", justifyContent: "flex-end", width: "50%"}} >
            <Button
              style={{ backgroundColor: "#00ACC1" }}
              round
              onClick={() => receberDoBD(inputFilter)}
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
