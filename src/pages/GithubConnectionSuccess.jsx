import React from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import StatusPill from '../components/StatusPill/StatusPill';
import './GithubConnectionSuccess.css';

const GithubConnectionSuccess = () => {
    const handleGoToDashboard = () => {
        // Navigate to dashboard
        console.log('Navigating to dashboard...');
        // window.location.href = '/dashboard';
    };

    return (
        <div className="success-container">
            <Card className="success-card">
                <div className="success-icon-wrapper">
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <div className="sparkles">
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                    </div>
                </div>

                <h1>Connected Successfully!</h1>
                <p>Your GitHub account has been linked to Shiplog. We're now ready to start analyzing your repositories.</p>

                <div className="details-box">
                    <div className="detail-item">
                        <span className="label">Status</span>
                        <StatusPill status="active">Active</StatusPill>
                    </div>
                    <div className="detail-item">
                        <span className="label">Integration</span>
                        <span className="value">GitHub App</span>
                    </div>
                </div>

                <Button variant="dashboard" onClick={handleGoToDashboard}>
                    Go to Dashboard
                </Button>
            </Card>
        </div>
    );
};

export default GithubConnectionSuccess;
