import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../../Database/Api/AdminApi.js";
import "./Admin.css";

function Admin() {
  const [currentPage, setCurrentPage] = useState("User Management");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage === "User Management") {
      fetchUsersData();
    }
  }, [currentPage]);

  const fetchUsersData = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (userId) => {
    navigate(`/editusers/${userId}`);
  };

  const handleAddClick = (userId) => {
    navigate(`/addusers`);
  };

  const handleDeleteClick = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.ok) {
        alert("User deleted successfully!");
        fetchUsersData(); // Refresh the user list after deletion
      } else {
        alert("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderUserManagement = () => (
    <div>
      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
            <button  className="button-Add" onClick={() => handleAddClick()}>
                    Add
                    </button>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <button className="button-Edit " onClick={() => handleEditClick(user.id)}>
                    Edit
                    </button>
                  <button className="button-Delete " onClick={() => handleDeleteClick(user.id)}>
                    Delete
                  </button>
                  {/* <button onClick={() => handleAddClick()}>
                    Add
                    </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "User Management":
        return renderUserManagement();
      case "Content Management":
        return <div>Content Management Content</div>;
      case "Database Management":
        return <div>Database Management Content</div>;
      case "Analytics & Reporting":
        return <div>Analytics & Reporting Content</div>;
      case "Communication Management":
        return <div>Communication Management Content</div>;
      case "System Settings":
        return <div>System Settings Content</div>;
      case "E-commerce Management":
        return <div>E-commerce Management Content</div>;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-title">Admin Panel</div>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("User Management")}
        >
          User Management
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Content Management")}
        >
          Content Management
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Database Management")}
        >
          Database Management
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Analytics & Reporting")}
        >
          Analytics & Reporting
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Communication Management")}
        >
          Communication Management
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("System Settings")}
        >
          System Settings
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("E-commerce Management")}
        >
          E-commerce Management
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="header">
          <h2>{currentPage}</h2>
          <div>-Admin-</div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Admin;
