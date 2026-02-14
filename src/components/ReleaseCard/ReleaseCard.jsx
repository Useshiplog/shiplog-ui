import React from 'react';
import StatusPill from '../StatusPill/StatusPill';
import './ReleaseCard.css';

const ReleaseCard = ({ release }) => {
    const {
        title,
        version,
        status,
        demandImpact,
        risk,
        shippedBy,
        location,
        productOwner,
        type // 'sell', 'pilot', 'hold'
    } = release;

    const getStatusType = (status) => {
        switch (status.toLowerCase()) {
            case 'live': return 'active';
            case 'shipped': return 'completed';
            case 'planned': return 'planned';
            default: return 'active';
        }
    };

    return (
        <div className="release-card">
            <div className="card-header">
                <div className="title-group">
                    <h2 className="release-title">{title}</h2>
                    <span className="release-version">{version}</span>
                    <StatusPill status={getStatusType(status)} className="status-badge">
                        • {status}
                    </StatusPill>
                </div>
                <div className="action-buttons">
                    <button className={`type-btn type-${type?.toLowerCase()}`}>
                        {type}
                    </button>
                    <button className="ask-btn">Ask a Question</button>
                </div>
            </div>

            <div className="card-grid">
                <div className="grid-item">
                    <label>DEMAND IMPACT</label>
                    <div className="impact-value">{demandImpact.value}</div>
                    <div className="impact-sub">{demandImpact.accounts} accounts</div>
                </div>

                <div className="grid-item">
                    <label>RISK</label>
                    <div className={`risk-value risk-${risk.toLowerCase()}`}>
                        <span className="risk-icon">
                            {risk.toLowerCase() === 'none' ? '✓' : '⚠'}
                        </span>
                        {risk}
                    </div>
                </div>

                <div className="grid-item">
                    <label>SHIPPED BY</label>
                    <div className="user-info">
                        <span className="user-icon">👤</span>
                        <div>
                            <div className="user-name">{shippedBy}</div>
                            <div className="user-location">{location}</div>
                        </div>
                    </div>
                </div>

                <div className="grid-item">
                    <label>PRODUCT OWNER</label>
                    <div className="user-info">
                        <span className="user-icon">👤</span>
                        <div>
                            <div className="user-name">{productOwner}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReleaseCard;
