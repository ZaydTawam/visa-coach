import "./index.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Interview from "./pages/Interview";
import Analysis from "./pages/Analysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import StartInterview from "./pages/StartInterview";

function App() {
  return (
    <div className="page-container">
      <div style={{ flex: 1 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/start-interview" element={<StartInterview />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
      <p
        style={{
          color: "#FFFFFF99",
          paddingBottom: "50px",
          marginTop: "23rem",
        }}
      >
        © 2025 Visa Coach. All rights reserved.
      </p>
    </div>
  );
}

export default App;
