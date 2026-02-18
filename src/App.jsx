import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ConnectToGithub from './pages/ConnectToGithub';
import GithubConnectionSuccess from './pages/GithubConnectionSuccess';
import ConnectToJira from './pages/ConnectToJira/ConnectToJira';
import JiraConnectionSuccess from './pages/JiraConnectionSuccess/JiraConnectionSuccess';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ConfigureShiplog from './pages/ConfigureShiplog/ConfigureShiplog';
import Chat from './pages/Chat/Chat';
import MainLayout from './components/Layout/MainLayout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public / Auth Routes (No Sidebar) */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/login" element={<Login />} />

          {/* App Routes (With Sidebar) */}
          <Route path="/dashboard" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/configure" element={
            <MainLayout>
              <ConfigureShiplog />
            </MainLayout>
          } />
          <Route path="/chat" element={<Navigate to="/chat/global" replace />} />
          <Route path="/chat/global" element={
            <MainLayout>
              <Chat mode="global" />
            </MainLayout>
          } />
          <Route path="/chat/release/:releaseId" element={
            <MainLayout>
              <Chat mode="release" />
            </MainLayout>
          } />

          {/* Legacy / Direct Connection Routes (Could also be wrapped if needed) */}
          {/* <Route path="/connect-to-github" element={<ConnectToGithub />} /> */}
          {/* <Route path="/github-connection-success" element={<GithubConnectionSuccess />} /> */}
          {/* <Route path="/connect-to-jira" element={<ConnectToJira />} /> */}
          {/* <Route path="/jira-connection-success" element={<JiraConnectionSuccess />} /> */}
        </Routes>
      </div>
    </Router>
  );
}




export default App;
