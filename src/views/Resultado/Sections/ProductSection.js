import React, { useState } from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Description from "@material-ui/icons/Description";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const [arrayTeste, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>
            Resultados de Violência no Adolescente
          </h2>
          <h5 className={classes.description}>
            Mostrar quais filtros devem ser aqui.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          {arrayTeste.map((item, index) => {
            return (
              <GridItem key={index} xs={12} sm={12} md={4}>
                <Link to="/ResultadoTrabalho">
                  <InfoArea
                    title="Título do Artigo"
                    description="Aqui vai as descrições do artigo, como autor, tema, a definir"
                    icon={Description}
                    iconColor="info"
                    vertical
                  />
                </Link>
              </GridItem>
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
}
