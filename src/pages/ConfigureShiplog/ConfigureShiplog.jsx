import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { redirectToOAuth } from '../../features/auth/oauthService';
import { API_URL } from '../../constants/constants';
import './ConfigureShiplog.css';

const ConfigureShiplog = () => {
    const [loading, setLoading] = useState(true);
    const [integrations, setIntegrations] = useState({ github: null, jira: null });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/v1/integrations/status`, {
                    credentials: 'include',
                });

                if (response.status === 401) {
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch integration status');
                }

                const json = await response.json();
                setIntegrations(json.data);
            } catch (err) {
                console.error('Error fetching integration status:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [navigate]);

    const handleGithubConnect = () => {
        redirectToOAuth('github');
    };

    const handleJiraConnect = () => {
        redirectToOAuth('jira');
    };

    const githubConnected = integrations.github?.connected;
    const jiraConnected = integrations.jira?.connected;

    return (
        <div className="configure-page">
            {/* Line loader at the very top */}
            {loading && <div className="line-loader" />}

            {!loading && (
                <>
                    <header className="page-header">
                        <h1>Configure Shiplog</h1>
                        <p className="page-subtitle">Manage your external integrations and settings.</p>
                    </header>

                    <section className="integration-section">
                        <h2 className="section-title">Integrations</h2>

                        <Card className="integration-card">
                            <div className="integration-left">
                                <div className="integration-icon github">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </div>
                                <div className="integration-info">
                                    <span className="integration-name">GitHub</span>
                                    <span className="integration-desc">Connect your repositories to track code changes.</span>
                                </div>
                            </div>
                            <div className="integration-right">
                                {githubConnected ? (
                                    <Button variant="primary" className="btn-manage" disabled={true} onClick={handleGithubConnect}>Connected</Button>
                                ) : (
                                    <Button variant="primary" onClick={handleGithubConnect}>Connect</Button>
                                )}
                            </div>
                        </Card>

                        <Card className="integration-card">
                            <div className="integration-left">
                                <div className="integration-icon jira">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0052CC">
                                        <path d="M11.53 2c0 2.228 1.806 4.035 4.035 4.035h4.032c2.23 0 4.035-1.807 4.035-4.035S21.827 0 19.597 0h-4.032c-2.23 0-4.035 1.807-4.035 4.035zm-5.766 5.766C5.764 9.994 7.57 11.8 9.799 11.8h4.032c2.228 0 4.035-1.806 4.035-4.034s-1.807-4.035-4.035-4.035H9.799c-2.229 0-4.035 1.807-4.035 4.035zm-5.764 5.764c0 2.229 1.806 4.035 4.034 4.035h4.033c2.228 0 4.034-1.806 4.034-4.035S10.27 11.53 8.04 11.53H4.001c-2.23 0-4.034 1.807-4.034 4.035l-.001-.001zM11.53 14h4.032c2.23 0 4.035 1.806 4.035 4.033s-1.806 4.036-4.035 4.036H11.53c-2.228 0-4.034-1.807-4.034-4.036S9.302 14 11.53 14zm-5.766 5.766h4.032c2.229 0 4.034 1.807 4.034 4.035S12.001 24 9.773 24H5.764c-2.228 0-4.035-1.807-4.035-4.035s1.807-4.034 4.035-4.034z" />
                                    </svg>
                                </div>
                                <div className="integration-info">
                                    <span className="integration-name">JIRA</span>
                                    <span className="integration-desc">
                                        {jiraConnected
                                            ? `Connected to ${integrations.jira.site_name}`
                                            : 'Connect JIRA to track task signals and progress.'}
                                    </span>
                                </div>
                            </div>
                            <div className="integration-right">
                                {jiraConnected ? (
                                    <Button variant="primary" className="btn-manage" disabled={true} onClick={handleJiraConnect}>Connected</Button>
                                ) : (
                                    <Button variant="primary" onClick={handleJiraConnect}>Connect</Button>
                                )}
                            </div>
                        </Card>
                    </section>
                </>
            )}
        </div>
    );
};

export default ConfigureShiplog;
