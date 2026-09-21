import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landpage from "./pages/Landpage";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes"

import Interview from "./Interview/Interview";

import { MyProvider } from "./context/MyContext";
import InterviewSetup from "./Interview/InterviewSetup";
import Feedback from "./Interview/Feedback";

import User from "./pages/user/User";

import InterviewHistory from "./pages/user/interviewhistory/interviewhistory";
import Dashboard from "./pages/user/dashboard/Dashboard";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";


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

          <Route
          path="/feedback/:sessionId"
          element={<Feedback/>}>
            </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/user" element={<User />}>

              <Route
                path="dashboard"
                element={<Dashboard />}
              />

              <Route
                path="interviews"
                element={<InterviewHistory />}
              />

            </Route>
          </Route>

          <Route
            path="/auth/register" element={<Register/>}
          />
          <Route
            path="/auth/login" element={<Login/>}
          />

        </Routes>

      </BrowserRouter>
    </MyProvider>
  );
}

export default App;