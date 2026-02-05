import React from 'react';
import './StatusPill.css';

const StatusPill = ({ children, status = 'active', className = '' }) => {
    return (
        <span className={`status-pill status-${status} ${className}`}>
            {children}
        </span>
    );
};

export default StatusPill;
