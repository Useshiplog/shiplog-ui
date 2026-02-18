import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import JiraSignalCard from './JiraSignalCard';
import GithubSignalCard from './GithubSignalCard';
import './ReleaseCard.css';

const ReleaseCard = ({ release }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const {
        external_id,
        created_at,
        business_summary,
        release_signals
    } = release;

    const { github_signals = [], jira_signals = [] } = release_signals || {};

    const formattedDate = created_at
        ? format(new Date(created_at), 'MMM d, yyyy, hh:mm a')
        : 'Unknown Date';

    // Find latest Jira signal for title and status
    const latestJira = [...jira_signals].sort((a, b) => b.signal_version - a.signal_version)[0];
    const releaseTitle = latestJira?.raw_payload?.jira?.issue?.fields?.summary || "Unnamed Release";
    const releaseStatus = latestJira?.raw_payload?.jira?.issue?.fields?.status?.name || "Unknown";

    const handleAskQuestion = (e) => {
        e.stopPropagation();
        if (external_id) {
            navigate(`/chat/release/${external_id}`);
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`release-card ${isExpanded ? 'is-expanded' : ''}`} onClick={toggleExpand}>
            <div className="card-header-row">
                <div className="header-left">
                    <h2 className="release-title">{releaseTitle}</h2>
                    <span className={`status-badge status-${releaseStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                        {releaseStatus}
                    </span>
                </div>
                <div className="header-right">
                    <button className="ask-btn-top" onClick={handleAskQuestion}>
                        <span className="ask-icon">💬</span> Ask a Question
                    </button>
                </div>
            </div>

            <div className="release-meta">
                <Calendar size={16} className="meta-icon" />
                <span className="meta-text">{formattedDate}</span>
                <span className="meta-separator">•</span>
                <span className="meta-text small-id">{external_id}</span>
                <span className="meta-separator">•</span>
                <span className="meta-text business-summary-label">Business Summary</span>
            </div>

            {isExpanded && (
                <div className="expanded-content">
                    <div className="content-section">
                        <p className="summary-text" onClick={(e) => e.stopPropagation()}>
                            {business_summary || "No business summary provided for this release."}
                        </p>
                    </div>

                    <div className="signals-section" onClick={(e) => e.stopPropagation()}>
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
            )}

            <div className="card-footer">
                <button className="show-more-btn">
                    {isExpanded ? (
                        <>Show less <ChevronUp size={16} /></>
                    ) : (
                        <>Show more <ChevronDown size={16} /></>
                    )}
                </button>
            </div>
        </div>
    );
};
export default ReleaseCard;
