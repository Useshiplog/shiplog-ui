import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConnectToGithub from './pages/ConnectToGithub';
import GithubConnectionSuccess from './pages/GithubConnectionSuccess';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <Link to="/" className="nav-logo">Shiplog</Link>
          <div className="nav-links">
            <Link to="/connect-to-github">Connect GitHub</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="nav-cta">Sign Up</Link>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={
              <div className="home-hero">
                <h1>Welcome to Shiplog</h1>
                <p>Turn your releases into Revenue</p>
                <Link to="/connect-to-github" className="cta-button">Get Started</Link>
              </div>
            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connect-to-github" element={<ConnectToGithub />} />
            <Route path="/github-connection-success" element={<GithubConnectionSuccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
