import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landpage from "./pages/Landpage";
import Footer from "./components/Footer";

import Interview from "./Interview/Interview";

import { MyProvider } from "./context/MyContext";
import InterviewSetup from "./Interview/InterviewSetup";

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Routes>

          {/* Landing Page */}
          <Route
            path="/"
            element={
              <>
                <div className="background">
                  <Navbar />
                  <Landpage />
                </div>

                <Footer />
              </>
            }
          />

          {/* Interview Page */}
          <Route
            path="/interview/:sessionId"
            element={<Interview />}
          />
          <Route
            path="/interview/setup"
            element={<InterviewSetup />}
          />

        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;