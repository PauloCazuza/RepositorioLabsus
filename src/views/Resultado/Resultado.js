import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    receberDoBD();
  }, []);

  function receberDoBD() {
    //db //.where("validar", "==", "Validar")
    db.get()
      .then(async (resultado) => {
        let listaDeTrab = [];
        for (let i = 0; i < 10; i++)
          await resultado.docs.forEach((doc) => {
            listaDeTrab.push({
              id: doc.id,
              ...doc.data(),
            });
          });

        console.log(listaDeTrab);

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
            style={{
              width: "50%",
              height: "8vh",
              borderRadius: "50px",
              padding: "5px",
              fontSize: "5vh",
              border: "solid",
              borderColor: "#67668B",
            }}
          />
          <Button color="primary" round>
            PESQUISAR
          </Button>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection listaDeTrab={listaDeTrab} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
