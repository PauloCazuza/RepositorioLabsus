import React, { useState } from "react";
import { Link } from "react-router-dom";

import { css } from "@emotion/core";
import { BounceLoader as Spinner } from "react-spinners";
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

export default function ProductSection({ listaDeTrab, titulo }) {
  // const [arrayTeste, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const classes = useStyles();

  return (
    <div className={classes.section} style={{ paddingTop: "10px" }}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>
            {titulo ? "Resultados para " + titulo : "Nossos trabalhos"}
          </h2>
          {/* <h5 className={classes.description}>
            Mostrar quais filtros devem ser aqui.
          </h5> */}
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          {listaDeTrab ? (
            listaDeTrab.map((item, index) => {
              return (
                <GridItem key={index} xs={12} sm={12} md={4}>
                  <Link to={"/ResultadoTrabalho/" + item.id}>
                    <InfoArea
                      title={item.Titulo.toUpperCase()}
                      description={
                        item.Autores +
                        " | " +
                        new Date(
                          item.DataDePublicacao.seconds * 1000
                        ).toLocaleDateString("pt-BR")
                      }
                      icon={Description}
                      iconColor="info"
                      vertical
                    />
                  </Link>
                </GridItem>
              );
            })
          ) : (
            <div
              className="sweet-loading"
              style={{
                width: "100%",
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                css={override}
                size={150}
                color={"#B2C8E0"}
                loading={true}
              />
            </div>
          )}
        </GridContainer>
      </div>
    </div>
  );
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: "#B2C8E0";
`;
