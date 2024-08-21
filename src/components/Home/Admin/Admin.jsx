import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  deleteordercollars,
  deletetags,
  deletecollars,
  deleteUser, // ฟังก์ชันใหม่สำหรับดึงข้อมูล smart_collars
  fetchAddressTags, // ฟังก์ชันใหม่สำหรับดึงข้อมูล address_tags
  fetchCollars,
  fetchProducts,
  fetchSmartCollars,
  fetchUsers
} from "../../../Database/Api/AdminApi.js";
import "./Admin.css";

function Admin() {
  const [currentPage, setCurrentPage] = useState("User Management");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]); // State สำหรับสินค้า
  const [smartCollars, setSmartCollars] = useState([]); // State สำหรับ smart_collars
  const [addressTags, setAddressTags] = useState([]); // State สำหรับ address_tags
  const [collars, setCollars] = useState([]); // State สำหรับ collars
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage === "User Management") {
      fetchUsersData();
    } else if (currentPage === "Content Management") {
      fetchProductsData();
    } else if (currentPage === "Order Product 1") {
      fetchSmartCollarsData();
    } else if (currentPage === "Order Product 2") {
      fetchAddressTagsData();
    } else if (currentPage === "Order Product 3") {
      fetchCollarsData();
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

  


  const fetchProductsData = async () => {
    try {
      const productsData = await fetchProducts(); // ใช้ฟังก์ชันดึงข้อมูลสินค้า
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSmartCollarsData = async () => {
    try {
      const data = await fetchSmartCollars();
      setSmartCollars(data);
    } catch (error) {
      console.error("Error fetching smart collars:", error);
    }
  };

  const fetchAddressTagsData = async () => {
    try {
      const data = await fetchAddressTags();
      setAddressTags(data);
    } catch (error) {
      console.error("Error fetching address tags:", error);
    }
  };

  const fetchCollarsData = async () => {
    try {
      const data = await fetchCollars();
      setCollars(data);
    } catch (error) {
      console.error("Error fetching collars:", error);
    }
  };

  const handleEditClick = (userId) => {
    navigate(`/editusers/${userId}`);
  };

  const handleAddClick = (userId) => {
    navigate(`/addusers`);
  };

  const handleAddorder1Click = (userId) => {
    navigate(`/addorder1`);
  };

  const handleAddorder2Click = (userId) => {
    navigate(`/addorder2`);
  };

  const handleAddorder3Click = (userId) => {
    navigate(`/addorder3`);
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
  
  const handleOrderDeleteClick = async (collarId) => {
    try {
      await deletecollars(collarId);
      alert("Smart collar deleted successfully!");
      // Refresh the smart collars list after deletion
      fetchSmartCollarsData();
    } catch (error) {
      console.error("Error deleting smart collar:", error);
    }
  };

  const handleTagDeleteClick = async (tagsId) => {
    try {
      await deletetags(tagsId);
      alert("Smart collar deleted successfully!");
      // Refresh the smart collars list after deletion
      fetchAddressTagsData();
    } catch (error) {
      console.error("Error deleting smart collar:", error);
    }
  };

  const handleordercollarsDeleteClick = async (ordercollarsId) => {
    try {
      await deleteordercollars(ordercollarsId);
      alert("Smart collar deleted successfully!");
      // Refresh the smart collars list after deletion
      fetchCollarsData();
    } catch (error) {
      console.error("Error deleting smart collar:", error);
    }
  };
  

  const handleProductDeleteClick = async (productId) => {
    try {
      await deleteProduct(productId);
      alert("Product deleted successfully!");
      // Refresh the product list after deletion
      fetchProductsData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const handleProductEditClick = (productId) => {
    navigate(`/editproduct/${(productId)}`);
  };

  const handleOrderEditClick = (collarId) => {
    navigate(`/orderedit/${collarId}`);
  };

  const handleOrder2EditClick = (tagId) => {
    navigate(`/order2edit/${tagId}`);
  };

  const handleOrder3EditClick = (collarId) => {
    navigate(`/order3edit/${collarId}`);
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
            <button className="button-Add" onClick={() => handleAddClick()}>
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
                  <button
                    className="button-Edit"
                    onClick={() => handleEditClick(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-Delete"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Delete
                  </button>
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

  const renderProductManagement = () => (
    <div>
      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            {/* <button className="button-Add" onClick={() => handleAddClick()}>
              Add
            </button> */}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  {console.log("Image URL:", product.image)}
                  <img
                    src={
                      product.image
                        ? product.image.startsWith("http")
                          ? product.image
                          : `${
                              process.env.REACT_APP_IMAGE_BASE_URL || ""
                            }/${product.image.replace(/\\/g, "/")}`
                        : "/path/to/default/image.jpg" // ใช้ภาพดีฟอลต์หากไม่มี URL
                    }
                    alt={product.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="button-Edit"
                    onClick={() => handleProductEditClick(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-Delete"
                    onClick={() => handleProductDeleteClick(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderOrderProduct1 = () => (
    <div>
      <h3>Order Product 1 - Smart Collars</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            <button className="button-Add" onClick={() => handleAddorder1Click()}>
              Add
            </button>
          </tr>
        </thead>
        <tbody>
          {smartCollars.length > 0 ? (
            smartCollars.map((collar) => (
              <tr key={collar.id}>
                <td>{collar.id}</td>
                <td>{collar.name}</td>
                <td>{collar.price}</td>
                <td>
                  <img
                    src={
                      collar.image
                        ? collar.image.startsWith("http")
                          ? collar.image
                          : `${
                              process.env.REACT_APP_IMAGE_BASE_URL || ""
                            }/${collar.image.replace(/\\/g, "/")}`
                        : "/path/to/default/image.jpg"
                    }
                    alt={collar.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="button-Edit"
                    onClick={() => handleOrderEditClick(collar.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-Delete"
                    onClick={() => handleOrderDeleteClick(collar.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No smart collars found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  

  const renderOrderProduct2 = () => (
    <div>
      <h3>Order Product 2 - Address Tags</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            <button className="button-Add" onClick={() => handleAddorder2Click()}>
              Add
            </button>
          </tr>
        </thead>
        <tbody>
          {addressTags.length > 0 ? (
            addressTags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td>{tag.price}</td>
                <td>
                  <img
                    src={
                      tag.image
                        ? tag.image.startsWith("http")
                          ? tag.image
                          : `${
                              process.env.REACT_APP_IMAGE_BASE_URL || ""
                            }/${tag.image.replace(/\\/g, "/")}`
                        : "/path/to/default/image.jpg"
                    }
                    alt={tag.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="button-Edit"
                    onClick={() => handleOrder2EditClick(tag.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-Delete"
                    onClick={() => handleTagDeleteClick(tag.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No address tags found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderOrderProduct3 = () => (
    <div>
      <h3>Order Product 3 - Collars</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            <button className="button-Add" onClick={() => handleAddorder3Click()}>
              Add
            </button>
          </tr>
        </thead>
        <tbody>
          {collars.length > 0 ? (
            collars.map((collar) => (
              <tr key={collar.id}>
                <td>{collar.id}</td>
                <td>{collar.name}</td>
                <td>{collar.price}</td>
                <td>
                  <img
                    src={
                      collar.image
                        ? collar.image.startsWith("http")
                          ? collar.image
                          : `${
                              process.env.REACT_APP_IMAGE_BASE_URL || ""
                            }/${collar.image.replace(/\\/g, "/")}`
                        : "/path/to/default/image.jpg"
                    }
                    alt={collar.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="button-Edit"
                    onClick={() => handleOrder3EditClick(collar.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-Delete"
                    onClick={() => handleordercollarsDeleteClick(collar.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No collars found</td>
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
        return renderProductManagement(); // แสดงตารางสินค้า
      case "Order Product 1":
        return renderOrderProduct1(); // แสดงตาราง smart collars
      case "Order Product 2":
        return renderOrderProduct2(); // แสดงตาราง address tags
      case "Order Product 3":
        return renderOrderProduct3(); // แสดงตาราง collars
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
          onClick={() => setCurrentPage("Order Product 1")}
        >
          Order Product 1
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Order Product 2")}
        >
          Order Product 2
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Order Product 3")}
        >
          Order Product 3
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
