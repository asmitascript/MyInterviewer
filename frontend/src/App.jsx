import "./App.css";
import Navbar from "./components/Navbar"
import Landpage from "./pages/Landpage"
import Footer from "./components/Footer"

import { useState } from "react";

import Interview from "./Interview/Interview"

import { MyProvider } from "./context/MyContext";


function App() {
  const { question, setQuestion} = useState("");
  const { answer, setAnswer} = useState("");

  const providerValues = {
    question, setQuestion,
    answer, setAnswer
  };

  return (
    <>
      <MyProvider>
        <Interview/>
      </MyProvider>
    </>
  );
}

export default App;

{/* <div className="background">
        <Navbar></Navbar>
        <Landpage></Landpage>
      </div>
      <Footer></Footer> */}