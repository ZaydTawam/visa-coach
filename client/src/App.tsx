import './index.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Welcome from './pages/Welcome';
import Interview from './pages/Interview';
import Analysis from './pages/Analysis';
import Login from './pages/Login';

function App() {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    country: '',
    university: '',
  });

  return (
    <div className="page-container">
      <div style={{ flex: 1 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home setUserInfo={setUserInfo} />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome userInfo={userInfo} />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
      <p
        style={{
          color: '#FFFFFF99',
          paddingBottom: '50px',
          marginTop: '23rem',
        }}
      >
        © 2025 Visa Coach. All rights reserved.
      </p>
    </div>
  );
}

export default App;
