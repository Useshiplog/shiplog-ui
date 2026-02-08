import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConnectToGithub from './pages/ConnectToGithub';
import GithubConnectionSuccess from './pages/GithubConnectionSuccess';
import ConnectToJira from './pages/ConnectToJira/ConnectToJira';
import JiraConnectionSuccess from './pages/JiraConnectionSuccess/JiraConnectionSuccess';
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
            <Link to="/connect-to-jira">Connect Jira</Link>
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
                <div className="hero-ctas">
                  <Link to="/connect-to-github" className="cta-button">Connect GitHub</Link>
                  <Link to="/connect-to-jira" className="cta-button jira-cta">Connect Jira</Link>
                </div>
              </div>
            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connect-to-github" element={<ConnectToGithub />} />
            <Route path="/github-connection-success" element={<GithubConnectionSuccess />} />
            <Route path="/connect-to-jira" element={<ConnectToJira />} />
            <Route path="/jira-connection-success" element={<JiraConnectionSuccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;
