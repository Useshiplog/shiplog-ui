import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, User, GitBranch } from 'lucide-react';

const JiraSignalCard = ({ signal }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const { raw_payload, key } = signal;
    const issue = raw_payload?.jira?.issue || {};
    const fields = issue.fields || {};
    const { summary, description, issuetype, status, assignee, reporter, comments } = fields;

    return (
        <div className="signal-card jira-card">
            <div className="signal-header">
                <div className="signal-title-row">
                    <div className="jira-id-group">
                        <span className="platform-icon jira-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.53 2c0-1.1 0.9-2 2-2h8.47c1.1 0 2 0.9 2 2v20c0 1.1-0.9 2-2 2H13.53c-1.1 0-2-0.9-2-2V2zM6.76 6.84c0-1.1 0.9-2 2-2h3.53c1.1 0 2 0.9 2 2v15.16c0 1.1-0.9 2-2 2H8.76c-1.1 0-2-0.9-2-2V6.84zM2 11.68c0-1.1 0.9-2 2-2h3.53c1.1 0 2 0.9 2 2v10.32c0 1.1-0.9 2-2 2H4c-1.1 0-2-0.9-2-2V11.68z" fill="#0052cc" /></svg>
                        </span>
                        <a href={`#`} className="signal-key">{key}</a>
                        {issuetype && <span className="signal-badge type-badge">{issuetype.name}</span>}
                        {status && <span className="signal-badge status-badge-jira">{status.name}</span>}
                    </div>
                </div>

                <div className="signal-summary">{summary}</div>

                <button
                    className="expand-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ?
                        <span className="expand-text">Show less <ChevronUp size={14} /></span> :
                        <span className="expand-text">Show details <ChevronDown size={14} /></span>
                    }
                </button>
            </div>

            {isExpanded && (
                <div className="signal-details">
                    {description && (
                        <div className="detail-section">
                            <label>Description</label>
                            <p className="detail-text">{description}</p>
                        </div>
                    )}

                    <div className="detail-grid">
                        <div className="detail-item">
                            <label>Assignee</label>
                            <div className="user-field">
                                {assignee?.displayName || 'Unassigned'}
                            </div>
                        </div>
                        <div className="detail-item">
                            <label>Reporter</label>
                            <div className="user-field">
                                {reporter?.displayName || 'Unknown'}
                            </div>
                        </div>
                    </div>

                    {comments && comments.length > 0 && (
                        <div className="comments-section">
                            <label>Comments ({comments.length})</label>
                            {comments.map((comment, idx) => (
                                <div key={idx} className="comment-item">
                                    <div className="comment-author">{comment.author?.displayName}</div>
                                    <div className="comment-body">{comment.body}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JiraSignalCard;
