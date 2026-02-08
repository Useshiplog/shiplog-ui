import React from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import StatusPill from '../../components/StatusPill/StatusPill';
import './JiraConnectionSuccess.css';

const JiraConnectionSuccess = () => {
    const handleGoToDashboard = () => {
        console.log('Navigating to dashboard...');
        window.location.href = '/dashboard';
    };

    return (
        <div className="success-container jira-success-container">
            <Card className="success-card">
                <div className="success-icon-wrapper">
                    <div className="success-icon jira-success-icon">
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

                <h1>Jira Connected!</h1>
                <p>Your Jira instance has been successfully linked to Shiplog. We're now ready to sync your tickets.</p>

                <div className="details-box">
                    <div className="detail-item">
                        <span className="label">Status</span>
                        <StatusPill status="active">Active</StatusPill>
                    </div>
                    <div className="detail-item">
                        <span className="label">Integration</span>
                        <span className="value">Jira Server/Cloud</span>
                    </div>
                </div>

                <Button variant="dashboard" onClick={handleGoToDashboard}>
                    Go to Dashboard
                </Button>
            </Card>
        </div>
    );
};

export default JiraConnectionSuccess;
