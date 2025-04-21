import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import StatsPage from './components/StatsPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe(); // Clean up on unmount
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/" />} />
        <Route path="/StatsPage" element={user ? <StatsPage user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
