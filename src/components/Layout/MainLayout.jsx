import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="layout-shell">
            <Sidebar />
            <main className="main-content-area">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
