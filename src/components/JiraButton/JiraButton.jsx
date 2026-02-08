import React from 'react';
import { getExternalId } from '../../features/auth/authService';
import './JiraButton.css';

const JiraButton = ({ children = 'Connect with Jira', className = '' }) => {
    const handleConnect = () => {
        const externalId = getExternalId();
        const redirectUri = encodeURIComponent('https://nonconstructive-unquayed-carri.ngrok-free.dev/v1/jira/install/callback');
        const authUrl = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=pHAPkSqsqFXy8hCnPM4j6xkbIZOiVsse&scope=read%3Ajira-work%20manage%3Ajira-webhook&redirect_uri=${redirectUri}&state=${externalId || ''}&response_type=code&prompt=consent`;
        window.location.href = authUrl;
    };

    return (
        <button className={`jira-btn ${className}`} onClick={handleConnect}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.564 1.554a.706.706 0 00-.706.706v9.366c0 .39.317.706.706.706h8.895c.858 0 1.288-1.038.682-1.644l-10-10a.705.705 0 00-.577-.134zm0 9.882a.706.706 0 00-.706.706v9.366c0 .39.317.706.706.706h8.895c.858 0 1.288-1.038.682-1.644l-10-10a.706.706 0 00-.577-.134zm-5.782 0a.706.706 0 00-.706.706v9.366c0 .39.317.706.706.706h8.895c.858 0 1.288-1.038.682-1.644l-10-10a.706.706 0 00-.577-.134zM0 11.436a.706.706 0 00.706.706h9.366c.39 0 .706-.317.706-.706V2.541c0-.858-1.038-1.288-1.644-.682l-10 10A.705.705 0 000 11.436z" />
            </svg>
            <span>{children}</span>
        </button>
    );
};

export default JiraButton;
