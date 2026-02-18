import React, { useState } from 'react';
import { GitPullRequest, ChevronDown, ChevronUp, GitBranch, Activity } from 'lucide-react';

const GithubSignalCard = ({ signal }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { raw_payload } = signal;
    const prData = raw_payload?.pr;
    const pr = prData?.pull_request;

    if (!pr) return null;

    const { title, number, body, head, action } = pr;
    const branchName = head?.ref || 'unknown';
    const prAction = prData?.action || action || 'unknown';

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`signal-card github-card ${isExpanded ? 'is-expanded' : ''}`} onClick={toggleExpand}>
            <div className="signal-header">
                <div className="gh-title-row">
                    <span className="platform-icon github-icon">
                        <GitPullRequest size={16} />
                    </span>
                    <span className="signal-summary-gh">{title}</span>
                    <span className="signal-id">#{number}</span>
                </div>

                <div className="expand-btn">
                    {isExpanded ?
                        <span className="expand-text">Show less <ChevronUp size={14} /></span> :
                        <span className="expand-text">Show details <ChevronDown size={14} /></span>
                    }
                </div>
            </div>

            {isExpanded && (
                <div className="signal-details" onClick={(e) => e.stopPropagation()}>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <label><GitBranch size={12} style={{ marginRight: '4px' }} /> Branch</label>
                            <div className="detail-text">{branchName}</div>
                        </div>
                        <div className="detail-item">
                            <label><Activity size={12} style={{ marginRight: '4px' }} /> Action</label>
                            <div className="detail-text">
                                <span className="signal-badge status-badge-jira" style={{ textTransform: 'capitalize' }}>
                                    {prAction}
                                </span>
                            </div>
                        </div>
                    </div>

                    {body && (
                        <div className="detail-section">
                            <label>Description</label>
                            <p className="detail-text">{body}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GithubSignalCard;

