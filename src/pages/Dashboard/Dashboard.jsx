import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';
import './Dashboard.css';

const Dashboard = () => {
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const response = await fetch('http://localhost:5001/v1/releases', {
                    credentials: 'include'
                });

                console.log('Response:', response);

                if (response.status === 401) {
                    console.log('401 Unauthorized - Redirecting to login');
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch releases');
                }

                const json = await response.json();
                console.log('Fetched release data:', json);
                setReleases(json.data?.releases || []);
            } catch (err) {


                setError(err.message);
                // Fallback to sample data if backend fails/is empty for dev purposes
                const sampleData = [
                    {
                        id: 1,
                        title: 'Team Collaboration Workspace',
                        version: 'v2.1',
                        status: 'Live',
                        type: 'Sell',
                        demandImpact: { value: '€890K', accounts: 23 },
                        risk: 'None',
                        shippedBy: 'Sarah Chen',
                        location: 'San Francisco, US',
                        productOwner: 'Marcus Williams'
                    },
                    {
                        id: 2,
                        title: 'API Rate Limit Controls',
                        version: 'v1.3',
                        status: 'Live',
                        type: 'Pilot',
                        demandImpact: { value: '€1.2M', accounts: 12 },
                        risk: 'Known',
                        shippedBy: 'Akira Tanaka',
                        location: 'Tokyo, JP',
                        productOwner: 'Jennifer Lopez'
                    },
                    {
                        id: 3,
                        title: 'Advanced Analytics Dashboard',
                        version: 'v1.0',
                        status: 'Shipped',
                        type: 'Hold',
                        demandImpact: { value: '€450K', accounts: 8 },
                        risk: 'Known',
                        shippedBy: 'Emma Rodriguez',
                        location: 'Madrid, ES',
                        productOwner: 'James Park'
                    },
                    {
                        id: 4,
                        title: 'Single Sign-On (SSO)',
                        version: 'v0.9',
                        status: 'Planned',
                        type: 'Hold',
                        demandImpact: { value: '€200K', accounts: 5 },
                        risk: 'None',
                        shippedBy: 'David Kim',
                        location: 'Seoul, KR',
                        productOwner: 'Linda White'
                    }
                ];
                setReleases(sampleData);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    const filteredReleases = filter === 'All'
        ? releases
        : releases.filter(r => r.type.toLowerCase() === filter.toLowerCase());

    const counts = {
        All: releases.length,
        Sell: releases.filter(r => r.type.toLowerCase() === 'sell').length,
        Pilot: releases.filter(r => r.type.toLowerCase() === 'pilot').length,
        Hold: releases.filter(r => r.type.toLowerCase() === 'hold').length
    };

    if (loading) return <div className="dashboard-loading">Loading releases...</div>;

    return (
        <div className="dashboard-page">
            <main className="dashboard-content">
                <div className="content-controls">
                    <h1 className="release-count">{filteredReleases.length} releases</h1>
                    <div className="filter-group">
                        {['All', 'Sell', 'Pilot', 'Hold'].map(f => (
                            <button
                                key={f}
                                className={`filter-btn ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f} ({counts[f]})
                            </button>
                        ))}
                    </div>
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
