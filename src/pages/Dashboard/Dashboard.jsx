import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';
import './Dashboard.css';
import { SYSTEM1_API_URL } from '../../constants/constants';

const Dashboard = () => {
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReleases = async () => {
            if (!SYSTEM1_API_URL) {
                setError('System 1 API URL is not configured. Please set VITE_SYSTEM1_API_URL environment variable.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${SYSTEM1_API_URL}/v1/releases`, {
                    credentials: 'include'
                });

                if (response.status === 401) {
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch releases');
                }

                const json = await response.json();
                setReleases(json.data || []);
            } catch (err) {
                setError(err.message);
                // Fallback removed
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    // Filter logic removed as filters are not in mockup yet
    const filteredReleases = releases;

    if (loading) return <div className="dashboard-loading">Loading releases...</div>;
    if (error) return <div className="dashboard-error">Error: {error}</div>;

    return (
        <div className="dashboard-page">
            <main className="dashboard-content">
                <div className="content-controls">
                    <h1 className="release-count">{filteredReleases.length} releases</h1>
                </div>

                <div className="release-list">
                    {filteredReleases.map(release => (
                        <ReleaseCard key={release.id} release={release} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
