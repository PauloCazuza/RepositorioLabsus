import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import firebase from "../../config/firebase";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
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
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { xmlAbnt } from "./abntXml/abnt";
import { classicNameResolver } from "typescript";
const { Cite, plugins, Citation } = require("@citation-js/core");
require("@citation-js/plugin-csl");
require("@citation-js/core/package.json");

let ABNT = "abnt";

function StringPalavrasChave(PalavrasChaves) {
  let string = "";

  if (PalavrasChaves)
    PalavrasChaves.map(item => string += "; " + item);

  return string;
}

// Cite.plugins.config.get("csl").templates.add(ABNT, xmlAbnt);

let config = plugins.config.get("@csl");
config.templates.add(ABNT, xmlAbnt);
// Citation.CSL.register.addTemplate(ABNT, xmlAbnt);

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
  const [autores, setAutores] = useState([]);

  const [trabalho, setTrabalho] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    receberDoBD();
  }, []);

  function gerarReferencias(cls = "abnt") {
    //  debugger;

    const { Titulo, Autores, DataDePublicacao } = trabalho;
    var arrayDeAutores = [];

    if (!Titulo) return;

    const numeroDeAutores = autores.length;

    for (let j = 0; j < numeroDeAutores; j++) {

      const autor = autores[j].split(" ");
      var sobrenomeDoAutor = ""; // autor[autor.length - 1];
      var nomeDoAutor = autor[0];

      for (let i = 1; i < (autor.length); i++) {
        if (nomeDoAutor == "" || nomeDoAutor == " ") {
          nomeDoAutor = autor[i];
          continue;
        } 
        sobrenomeDoAutor += autor[i] + (i != (autor.length - 1) ? " " : "") ;
      }

      arrayDeAutores.push({ family: sobrenomeDoAutor, given: nomeDoAutor });

      console.log(nomeDoAutor);
    }

    console.log(arrayDeAutores)

    const Ano = new Date(
      trabalho.DataDePublicacao.seconds * 1000
    ).getFullYear();

    let cite = new Cite({
      type: "article-journal",
      title: Titulo,
      author: arrayDeAutores,
      issued: { "date-parts": [[Ano]] },
    });

    let date = new Date().toLocaleDateString();

    let teste = cite.format("bibliography", {
      format: "text",
      template: cls,
      append: ` Acessado em ${date}`,
    });

    navigator.clipboard.writeText(teste);

    alert("Referência copiado com sucesso !");
  }

  function dataAtualFormatada(data) {
    const dia = data.getDate().toString();
    const diaF = (dia.length == 1) ? '0' + dia : dia;
    const mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
    const mesF = (mes.length == 1) ? '0' + mes : mes;
    const anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  }

  function receberDoBD() {
    db.doc(id)
      .get()
      .then(async (doc) => {
        let listaDeTrab = [];

        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setTrabalho(doc.data());
          const autores = doc.data().Autores.split(";");
          setAutores(autores);
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
                    <h6>{trabalho && autores[0]}</h6>
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
                  <b>Data de publicação: </b>
                  {trabalho && dataAtualFormatada(new Date(
                    trabalho.DataDePublicacao.seconds * 1000
                  ))}
                </div>
                {/* <div>
                  <b>Tipo:</b> {trabalho && "Não definido ainda"}
                </div> */}
                <div>
                  <b>Palavras-chave:</b> {trabalho && StringPalavrasChave(trabalho.PalavrasChave)}
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

                  <Button
                    color="default"
                    round
                    onClick={() => gerarReferencias(ABNT)}
                  >
                    ABNT
                  </Button>

                  <Button
                    color="default"
                    round
                    onClick={() => gerarReferencias("vancouver")}
                  >
                    VANCOUVER
                  </Button>

                  <Button
                    color="default"
                    round
                    onClick={() => gerarReferencias("apa")}
                  >
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
                      `https://drive.google.com/uc?authuser=0&id=${trabalho.Link.split("/")[5]
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
            {/* {cite.format("bibliography", {
              format: "html",
              template: "apa",
              prepend(entry) {
                return `[${entry.id}]: `;
              },
              append: ` [Retrieved on ${date}]`,
            })} */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
