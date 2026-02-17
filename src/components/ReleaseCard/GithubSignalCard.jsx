import React from 'react';
import { GitPullRequest, GitCommit, FileText } from 'lucide-react';

const GithubSignalCard = ({ signal }) => {
    const { raw_payload } = signal;
    const pr = raw_payload?.pr?.pull_request;

    if (!pr) return null;

    const { title, number, body, user, html_url } = pr;

    return (
        <div className="signal-card github-card">
            <div className="signal-header-simple">
                <div className="gh-title-row">
                    <span className="platform-icon github-icon">
                        <GitPullRequest size={16} />
                    </span>
                    <span className="signal-summary-gh">{title}</span>
                    <span className="signal-id">#{number}</span>
                </div>
                {body && <div className="signal-body-preview">{body}</div>}
            </div>
        </div>
    );
};

export default GithubSignalCard;
