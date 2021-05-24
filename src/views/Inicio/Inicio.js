import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionDownload from "./Sections/SectionDownload.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles, { index: 1 });

export default function Inicio(props) {
  const [inputFilter, setInputFilter] = useState("");
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Repositório LABSUS"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Repositório LABSUS</h1>
                <h3 className={classes.subtitle} style={{ fontSize: "2.5vh" }}>
                  Espaço destinado para armazenar, preservar, organizar e
                  disseminar amplamente os resultados de pesquisa do Laboratório
                  de Pesquisa Social, Educação Transformadora e Saúde Coletiva -
                  LABSUS.
                </h3>
                <br />
                <input
                  type="text"
                  onChange={(e) => setInputFilter(e.target.value)}
                  style={{
                    width: "50%",
                    height: "7vh",
                    borderRadius: "50px",
                    padding: "15px",
                    fontFamily: "Roboto",
                    fontSize: "3vh",
                    border: "solid",
                    borderColor: "#67668B",
                  }}
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    width: "50%",
                  }}
                >
                  <Link to={"/Resultado/" + inputFilter}>
                    <Button color="primary" round>
                      PESQUISAR
                    </Button>
                  </Link>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionDownload />
        {/* <SectionCarousel /> */}
      </div>
      <Footer />
    </div>
  );
}
