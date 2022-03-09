import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import VRScene from "./components/VRScene";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBBhCohZ-RdwhtUAJ-fjeDHz6O9m9h7MdI",
  authDomain: "tttbi-b3586.firebaseapp.com",
  projectId: "tttbi-b3586",
  storageBucket: "tttbi-b3586.appspot.com",
  messagingSenderId: "845794789152",
  appId: "1:845794789152:web:758313ce3255755294b945",
  measurementId: "G-3K8C1K8S2D",
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <VRScene />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
