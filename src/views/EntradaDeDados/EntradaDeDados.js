import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";
import fire from "firebase/app";
import "firebase/firestore";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from "components/CustomButtons/Button.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import firebase from "../../config/firebase";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const db = firebase.firestore().collection("trabalhos");


const useStyles = makeStyles(styles);

export default function Entrada(props) {
  const [Autores, setAutores] = useState("");
  const [DataDePublicacao, setDataDePublicacao] = useState(formatDate(new Date()));
  const [Link, setLink] = useState("");
  const [Resumo, setResumo] = useState("");
  const [Titulo, setTitulo] = useState("");
  const [PalavrasChave, setPalavrasChave] = useState("");
  const [message, setMessage] = useState("");

  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  function limparParametros() {
    setAutores("");
    setDataDePublicacao(formatDate(new Date()));
    setLink("");
    setResumo("");
    setPalavrasChave('');
    setTitulo("");
  }

  function enviarParaOBD() {
    setMessage("");
    let palavraChave = [];
    if (PalavrasChave.includes(";")) palavraChave = PalavrasChave.split(";");
    else palavraChave = [PalavrasChave];

    if (!(Autores && Link && Resumo && PalavrasChave && Titulo))
      return alert("Preencha os campos corretamente");

    db.add({
      Autores,
      DataDePublicacao: fire.firestore.Timestamp.fromDate(
        new Date(DataDePublicacao)
      ),
      Link,
      Resumo,
      PalavrasChave: palavraChave,
      Titulo,
    })
      .then(() => {
        alert('Seu trabalho foi cadastrado com sucesso!');
        limparParametros();
      })
      .catch((erro) => {
        alert("Ocorreu um erro ao cadastrar seu trabalho, por favor verifique se os dados estão corretos.");
        setMessage("Deu erro >:( -->" + erro.message);
      });
  }

  const { ...rest } = props;

  return (
    <>

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

      <Parallax
        style={{ height: "30vh" }}
        small
        filter
        image={require("assets/img/profile-bg.jpg")}
      />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div
          style={{
            display: "flex",
            padding: 10,
            alignItems: "center",
            justifyContent: "center"
            // height: "90vh",
          }}
        >
          <div className={classes.container}>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={require("assets/img/inputs.jpg")}
                      alt="..."
                      style={{ height: "150px", width: "150px", }}
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {'Cadastro de Trabalhos Cientificos'}
                    </h3>
                    {/* <h6>{trabalho && trabalho.Autores}</h6> */}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer direction="row">
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Titulo"
                  inputProps={{
                    placeholder: "Titulo"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (e) => setTitulo(e.target.value),
                    value: Titulo
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Resumo"
                  inputProps={{
                    placeholder: "Resumo"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (e) => setResumo(e.target.value),
                    value: Resumo
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Autor"
                  inputProps={{
                    placeholder: "Autor"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (e) => setAutores(e.target.value),
                    value: Autores
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Palavras-Chave"
                  inputProps={{
                    placeholder: "Palavras-Chave"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (e) => setPalavrasChave(e.target.value),
                    value: PalavrasChave,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Data de Publicação"
                  inputProps={{
                    // placeholder: Date.toString()
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (e) => setDataDePublicacao(e.target.value),
                    value: DataDePublicacao,
                    type: "date"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Link"
                  inputProps={{
                    placeholder: "Link"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: (e) => setLink(e.target.value),
                    value: Link,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                  <Button onClick={() => enviarParaOBD()} round>
                    ENVIAR
                </Button>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <div>
                  <label style={{ width: "100%" }}> {message} </label>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styleInput = {
  width: "100%"
};
