import React, { useState, useEffect } from "react";
import fire from "firebase/app";
import "firebase/firestore";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import firebase from "../../config/firebase";

const db = firebase.firestore().collection("trabalhos");

export default function Entrada() {
  const [Autores, setAutores] = useState("");
  const [DataDePublicacao, setDataDePublicacao] = useState("");
  const [Link, setLink] = useState("");
  const [Resumo, setResumo] = useState("");
  const [Titulo, setTitulo] = useState("");
  const [PalavrasChave, setPalavrasChave] = useState("");
  const [message, setMessage] = useState("");

  function limparParametros() {
    setAutores("");
    setDataDePublicacao("");
    setLink("");
    setResumo("");
    setTitulo("");
  }

  function enviarParaOBD() {
    setMessage("");
    let palavraChave = [];
    if (PalavrasChave.includes(";")) palavraChave = PalavrasChave.split(";");
    else palavraChave = [PalavrasChave];

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
        setMessage("Deu bom hehe");
        limparParametros();
      })
      .catch((erro) => {
        setMessage("Deu erro >:( -->" + erro.message);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <GridContainer direction="column">
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <label> Titulo: </label>
            <input value={Titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <label> Resumo: </label>
            <input value={Resumo} onChange={(e) => setResumo(e.target.value)} />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <label> Autor: </label>
            <input
              value={Autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <label> Palavras-Chave: </label>
            <input
              value={PalavrasChave}
              onChange={(e) => setPalavrasChave(e.target.value)}
            />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <label> Data de Publicação: </label>
            <input
              type="date"
              value={DataDePublicacao}
              onChange={(e) => setDataDePublicacao(e.target.value)}
            />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <label> Link: </label>
            <input value={Link} onChange={(e) => setLink(e.target.value)} />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <button style={{ width: "100%" }} onClick={() => enviarParaOBD()}>
              Enviar
            </button>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div>
            <label style={{ width: "100%" }}> {message} </label>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
