import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/auth.js";
import { Redirect } from "react-router-dom";
import firebase from '../../config/firebase';
import 'firebase/auth';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import CircularProgress from '@material-ui/core/CircularProgress';
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const { logado, setStatus } = useContext(AuthContext);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(false);
  // const [logado, setLogado] = useState(false);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  function logar() {
    setCarregando(true);

    firebase.auth().signInWithEmailAndPassword(email, password).then(async resultado => {
      setCarregando(false);
      setStatus(true);

    }).catch(erro => {
      console.log(erro)
      alert(getMessageByErrorCode(erro.code));
      setCarregando(false);
    })
  }

  function getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/invalid-email":
        return "Email invalido";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/network-request-failed":
        return "Sem conexão a internet";
      default:
        return "Error desconhecido";
    }
  }

  const classes = useStyles();
  const { ...rest } = props;

  if (logado) {
    return <Redirect to='/EntradaDeDados' />;
  }

  return (
    <div>

      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />

      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <p className={classes.divider}>Repositório LABSUS</p>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        onChange: (e) => setEmail(e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        onChange: (e) => setPassword(e.target.value),
                        onKeyDown: (e) => {
                          if (e.which == 13 || e.keyCode == 13) {
                            logar();
                          }
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {
                      !carregando ?
                        <Button simple color="primary" size="lg" onClick={() => logar()}>
                          Logar
                      </Button>
                        :
                        <CircularProgress />
                    }
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
