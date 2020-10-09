import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import firebase from "../../config/firebase";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";

import Description from "@material-ui/icons/Description";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/profile.png";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const db = firebase.firestore().collection("trabalhos");

export default function DetalheArtigo(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const [trabalho, setTrabalho] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    receberDoBD();
  }, []);

  function receberDoBD() {
    db.doc(id)
      .get()
      .then(async (doc) => {
        let listaDeTrab = [];

        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setTrabalho(doc.data());
          console.log("Document data:", doc.data());
        }
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
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        style={{ height: "30vh" }}
        small
        filter
        image={require("assets/img/profile-bg.jpg")}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={profile}
                      alt="..."
                      style={{ height: "150px", width: "150px" }}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {trabalho && trabalho.Titulo}
                    </h3>
                    <h6>{trabalho && trabalho.Autores}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div
              style={{
                width: "100%",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              <p>
                {trabalho && (
                  <>
                    <b>RESUMO: </b> {trabalho.Resumo}
                  </>
                )}
              </p>
            </div>
            {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
            <GridContainer justify="center">
              <GridItem
                xs={12}
                sm={12}
                md={4}
                className={classes.navWrapper}
                direction="column"
                style={{ textAlign: "initial" }}
              >
                <div>
                  <b>Autores:</b> {trabalho && trabalho.Autores}
                </div>
                <div>
                  <b>Data de publicação:</b>{" "}
                  {trabalho &&
                    new Date(
                      trabalho.DataDePublicacao.seconds * 1000
                    ).toLocaleDateString("pt-BR")}
                </div>
                <div>
                  <b>Tipo:</b> {trabalho && "Não definido ainda"}
                </div>
                <div>
                  <b>Palavras-chave:</b> {trabalho && trabalho.Autores}
                </div>
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={4}
                className={classes.navWrapper}
                direction="column"
              >
                <div>
                  <div>
                    <h5>COMO CITAR</h5>
                  </div>

                  <Button color="default" round>
                    ABNT
                  </Button>

                  <Button color="default" round>
                    VANCOUVER
                  </Button>

                  <Button color="default" round>
                    APA
                  </Button>
                </div>
              </GridItem>

              <GridItem
                xs={12}
                sm={12}
                md={4}
                className={classes.navWrapper}
                direction="column"
              >
                <div>
                  <div>
                    <h5>DOWNLOAD</h5>
                  </div>

                  <Button
                    href={
                      trabalho &&
                      `https://drive.google.com/uc?authuser=0&id=${
                        trabalho.Link.split("/")[5]
                      }&export=download`
                    }
                    color="default"
                    round
                  >
                    DOWNLOAD
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
