import "./App.css";
import Navbar from "./components/Navbar"
import Landpage from "./pages/Landpage"


function App() {
  return (
    <div className="background">
      <Navbar></Navbar>
      <Landpage></Landpage>
    </div>
  );
}

export default App;