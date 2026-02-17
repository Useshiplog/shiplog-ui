import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import JiraSignalCard from './JiraSignalCard';
import GithubSignalCard from './GithubSignalCard';
import './ReleaseCard.css';

const ReleaseCard = ({ release }) => {
    const {
        release_signal_lts_version,
        external_id,
        created_at,
        business_summary,
        release_signals
    } = release;

    const { github_signals = [], jira_signals = [] } = release_signals || {};

    const formattedDate = created_at
        ? format(new Date(created_at), 'MMM d, yyyy, hh:mm a')
        : 'Unknown Date';

    // Placeholder title logic until we have real project names
    const releaseTitle = "CPQ";

    return (
        <div className="release-card">
            <div className="card-header-row">
                <div className="header-left">
                    <h2 className="release-title">{releaseTitle}</h2>
                    <span className="status-badge-released">Released</span>
                </div>
                <div className="header-right">
                    <button className="ask-btn-top">
                        <span className="ask-icon">💬</span> Ask a Question
                    </button>
                </div>
            </div>

            <div className="release-meta">
                <Calendar size={16} className="meta-icon" />
                <span className="meta-text">{formattedDate}</span>
                {/* Optional: Show version/ID if helpful */}
                <span className="meta-separator">•</span>
                <span className="meta-text small-id">{external_id}</span>
            </div>

            <div className="content-section">
                <h3 className="section-label">Business Summary</h3>
                <p className="summary-text">
                    {business_summary || "No business summary provided for this release."}
                </p>
            </div>

            <div className="signals-section">
                {jira_signals.length > 0 && (
                    <div className="signal-group">
                        <h3 className="section-label">JIRA Issues</h3>
                        <div className="signal-list">
                            {jira_signals.map(signal => (
                                <JiraSignalCard key={signal._id} signal={signal} />
                            ))}
                        </div>
                    </div>
                )}

                {github_signals.length > 0 && (
                    <div className="signal-group">
                        <h3 className="section-label">GitHub Pull Requests</h3>
                        <div className="signal-list">
                            {github_signals.map(signal => (
                                <GithubSignalCard key={signal._id} signal={signal} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReleaseCard;
