/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import Carousel from "../../Carousel";
// core components
import styles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";

const useStyles = makeStyles(styles);

export default function SectionDownload() {
  const classes = useStyles();
  return (
    <div className={classes.section} style={{ padding: 10 }}>
      <div className={classes.container}>
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2>Sejam Bem vindos ao Repositório do Labsus!</h2>
            {/* <h4>
              Sejam bem vindos ao repositório do grupo de pesquisa Labsus!
            </h4> */}
            <h4 style={{ textAlign: "justify", textJustify: "inter-word" }}>
              &emsp;
              {` Repositório LABSUS é um espaço criado pelo grupo de pesquisa Laboratório de Pesquisa Social, Educação Transformadora e Saúde Coletiva - LABSUS com o objetivo de compartilhar com a comunidade acadêmico e demais interessados as produções sistematizados pelo grupo.`}
            </h4>
            <h4>
              Vem conhecer um pouco dos nossos ideais e projetos desenvolvidos.
            </h4>
          </GridItem>
          {/* <GridItem xs={12} sm={8} md={6}>
            <Button
              color="primary"
              size="lg"
              href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-download-section"
              target="_blank"
            >
              Free React Download
            </Button>
            <Button
              color="primary"
              size="lg"
              href="https://www.creative-tim.com/product/material-kit?ref=mkr-download-section"
              target="_blank"
            >
              Free HTML Downoad
            </Button>
          </GridItem> */}

          <GridItem >
            <Carousel />
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={8}>
            <h2>Nossas temáticas</h2>
            <h4>Saúde Coletiva (Tema Central)</h4>
            <h4> Saúde do Adolescente </h4>
            <h4>Competências Socioemocionais</h4>
            <h4> Tecnologias Digitais de Informação e Comunicação (TDIC)</h4>
            <h4>Saúde Mental</h4>
          </GridItem> */}
        </GridContainer>
      </div>
    </div>
  );
}
