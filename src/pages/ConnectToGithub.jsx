import React from 'react';
import Card from '../components/Card/Card';
import GithubButton from '../components/GithubButton/GithubButton';
import './ConnectToGithub.css';

const ConnectToGithub = () => {
    return (
        <div className="connect-container">
            <Card className="connect-card">
                <div className="icon-container">
                    <svg height="48" viewBox="0 0 16 16" version="1.1" width="48" aria-hidden="true" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                </div>
                <h1>Connect to GitHub</h1>
                <p>Integrate Shiplog with your GitHub account to start scanning your Pull Requests for better code quality and security.</p>

                <GithubButton>Connect with GitHub</GithubButton>

                <div className="secure-info">
                    <svg height="12" viewBox="0 0 16 16" version="1.1" width="12" aria-hidden="true" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l7-1.4 7 1.4a1 1 0 001.169-1.409l-7-14z"></path>
                        <path d="M8 1a1 1 0 011 1v6.5a1 1 0 01-2 0V2a1 1 0 011-1z"></path>
                    </svg>
                    Secure connection authorized by GitHub
                </div>
            </Card>
        </div>
    );
};

export default ConnectToGithub;
