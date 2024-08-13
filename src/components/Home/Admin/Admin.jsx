import React, { useState } from 'react';
import './Admin.css';

function Admin() { 
  const [currentPage, setCurrentPage] = useState('User Management');

  const renderContent = () => {
    switch(currentPage) {
      case 'User Management':
        return <div>User Management Content</div>;
      case 'Content Management':
        return <div>Content Management Content</div>;
      case 'Database Management':
        return <div>Database Management Content</div>;
      case 'Analytics & Reporting':
        return <div>Analytics & Reporting Content</div>;
      case 'Communication Management':
        return <div>Communication Management Content</div>;
      case 'System Settings':
        return <div>System Settings Content</div>;
      case 'E-commerce Management':
        return <div>E-commerce Management Content</div>;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-title">User Management</div>
        <button className="sidebar-button" onClick={() => setCurrentPage('User Management')}>User Management</button>
        <button className="sidebar-button" onClick={() => setCurrentPage('Content Management')}>Content Management</button>
        <button className="sidebar-button" onClick={() => setCurrentPage('Database Management')}>Database Management</button>
        <button className="sidebar-button" onClick={() => setCurrentPage('Analytics & Reporting')}>Analytics & Reporting</button>
        <button className="sidebar-button" onClick={() => setCurrentPage('Communication Management')}>Communication Management</button>
        <button className="sidebar-button" onClick={() => setCurrentPage('System Settings')}>System Settings</button>
        <button className="sidebar-button" onClick={() => setCurrentPage('E-commerce Management')}>E-commerce Management</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="header">
          <h2>{currentPage}</h2>
          <div>-Admin -</div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Admin;