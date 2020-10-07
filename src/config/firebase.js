import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDGWKnJMrlUxeSMOAbCKQTcIwwH88yUfTk",
  authDomain: "repositoriolabsus.firebaseapp.com",
  databaseURL: "https://repositoriolabsus.firebaseio.com",
  projectId: "repositoriolabsus",
  storageBucket: "repositoriolabsus.appspot.com",
  messagingSenderId: "955446308698",
  appId: "1:955446308698:web:c7a18c17fa45cbc1648d63",
  measurementId: "G-BJSLWC9ELZ",
};

export default firebase.initializeApp(firebaseConfig);
