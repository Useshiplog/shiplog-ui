import React from 'react';
import Card from '../../components/Card/Card';
import JiraButton from '../../components/JiraButton/JiraButton';
import './ConnectToJira.css';

const ConnectToJira = () => {
    return (
        <div className="connect-container">
            <Card className="connect-card">
                <div className="icon-container jira-icon-container">
                    <svg height="48" viewBox="0 0 16 16" version="1.1" width="48" aria-hidden="true" fill="currentColor">
                        <path d="M14.653 7.426c.264-.176.353-.529.264-.794l-1.94-5.204c-.176-.441-.706-.617-1.147-.441l-5.204 1.941c-.265.088-.441.353-.441.617v5.204c0 .353.265.618.618.618h5.204c.264 0 .529-.176.617-.441l1.941-5.204c.088-.265 0-.617-.265-.794zM7.5 12.5c-.276 0-.5-.224-.5-.5V7h-5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h5zm6.5 0c-.276 0-.5-.224-.5-.5V7H8.5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h5z"></path>
                    </svg>
                </div>
                <h1>Connect to Jira</h1>
                <p>Integrate Shiplog with your Jira instance to sync your tickets and automate your release notes effortlessly.</p>

                <JiraButton>Connect with Jira</JiraButton>

                <div className="secure-info">
                    <svg height="12" viewBox="0 0 16 16" version="1.1" width="12" aria-hidden="true" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l7-1.4 7 1.4a1 1 0 001.169-1.409l-7-14z"></path>
                        <path d="M8 1a1 1 0 011 1v6.5a1 1 0 01-2 0V2a1 1 0 011-1z"></path>
                    </svg>
                    Secure connection authorized by Atlassian
                </div>
            </Card>
        </div>
    );
};

export default ConnectToJira;
