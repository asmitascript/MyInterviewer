import "./App.css";
import Navbar from "./components/Navbar"
import Landpage from "./pages/Landpage"
import Footer from "./components/Footer"


function App() {
  return (
    <>
      <div className="background">
        <Navbar></Navbar>
        <Landpage></Landpage>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;