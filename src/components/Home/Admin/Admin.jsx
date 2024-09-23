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
  fetchUsers,
  fetchddelivery,
  fetchOrders,
  fetchton,
  deleteton,
} from "../../../Database/Api/AdminApi.js";
import Swal from 'sweetalert2';
import "./Admin.css";

function Admin() {
  const [currentPage, setCurrentPage] = useState("User Management");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]); // State สำหรับสินค้า
  const [smartCollars, setSmartCollars] = useState([]); // State สำหรับ smart_collars
  const [addressTags, setAddressTags] = useState([]); // State สำหรับ address_tags
  const [collars, setCollars] = useState([]); // State สำหรับ collars
  const [ton, setTon] = useState([]); // State สำหรับ collars
  const [deliveries, setDeliveries] = useState([]);
  const [orderlist, setOrderlist] = useState([]);

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
    } else if (currentPage === "Order Product 4") {
      fetchTonData();
    } else if (currentPage === "address") {
      renderDeliveriesData();
    } else if (currentPage === "Order list") {
      fetchOrderlistData();
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

  const renderDeliveriesData = async () => {
    try {
      const DeliveriesData = await fetchddelivery(); // ใช้ฟังก์ชันดึงข้อมูลที่อยู่ลูกค้า
      setDeliveries(DeliveriesData);
    } catch (error) {
      console.error("Error fetching Deliveries:", error);
    }
  };

  const fetchOrderlistData = async () => {
    try {
      const OrderlistData = await fetchOrders(); // ใช้ฟังก์ชันดึงข้อมูลรายการสั่งซื้อ
      setOrderlist(OrderlistData);
    } catch (error) {
      console.error("Error fetching Orderlist:", error);
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

  const fetchTonData = async () => {
    try {
      const data = await fetchton();
      setTon(data);
    } catch (error) {
      console.error("Error fetching ton:", error);
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

  const handleAddorder4Click = (userId) => {
    navigate(`/addorder4`);
  };

  const handleDeleteClick = async (userId) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteUser(userId);
          
          // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์
          if (response.ok || response.status === 200) {
            Swal.fire('สำเร็จ!', 'ข้อมูลผู้ใช้ถูกลบเรียบร้อยแล้ว', 'success');
            
            // อัปเดตข้อมูลใน State โดยไม่ต้องรีเฟรช
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
            
            // หรือเรียก fetchUsersData() และรอให้ทำงานเสร็จก่อน
            // await fetchUsersData();
          } else {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบผู้ใช้ได้', 'error');
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire('เกิดข้อผิดพลาด', 'มีบางอย่างผิดพลาด', 'error');
        }
      }
    });
  };
  
  
  const handleOrderDeleteClick = async (collarId) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ' ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletecollars(collarId);
          Swal.fire('สำเร็จ!', 'สินค้าถูกลบเรียบร้อยแล้ว', 'success');
          fetchSmartCollarsData(); // Refresh the smart collars list after deletion
        } catch (error) {
          console.error("Error deleting smart collar:", error);
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบปลอกคออัจฉริยะได้', 'error');
        }
      }
    });
  };
  
  const handleTagDeleteClick = async (tagsId) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ' ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletetags(tagsId);
          Swal.fire('สำเร็จ!', 'สินค้าถูกลบเรียบร้อยแล้ว', 'success');
          fetchAddressTagsData(); // Refresh the address tags list after deletion
        } catch (error) {
          console.error("Error deleting address tag:", error);
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบที่อยู่ได้', 'error');
        }
      }
    });
  };
  
  const handleordercollarsDeleteClick = async (ordercollarsId) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ' ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteordercollars(ordercollarsId);
          Swal.fire('สำเร็จ!', 'สินค้าถูกลบเรียบร้อยแล้ว', 'success');
          fetchCollarsData(); // Refresh the smart collars list after deletion
        } catch (error) {
          console.error("Error deleting order collar:", error);
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบปลอกคออัจฉริยะได้', 'error');
        }
      }
    });
  };
  
  const handleProductDeleteClick = async (productId) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ' ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(productId);
          Swal.fire('สำเร็จ!', 'สินค้าถูกลบเรียบร้อยแล้ว', 'success');
          fetchProductsData(); // Refresh the product list after deletion
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบสินค้าได้', 'error');
        }
      }
    });
  };
  
  const handleTonDeleteClick = async (tonId) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ' ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteton(tonId);
          Swal.fire('สำเร็จ!', 'สินค้าถูกลบเรียบร้อยแล้ว', 'success');
          fetchTonData(); // Refresh the product list after deletion
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบสินค้าได้', 'error');
        }
      }
    });
  };
  

  const handleProductEditClick = (productId) => {
    navigate(`/editproduct/${productId}`);
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

  const handleTonEditClick = (tonId) => {
    navigate(`/tonedit/${tonId}`);
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
      <h3>-การไฟฟ้า-</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            <button
              className="button-Add"
              onClick={() => handleAddorder1Click()}
            >
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
      <h3>-การประปา-</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            <button
              className="button-Add"
              onClick={() => handleAddorder2Click()}
            >
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
      <h3>-โทรมนาคม-</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            <button
              className="button-Add"
              onClick={() => handleAddorder3Click()}
            >
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

  const renderOrderProduct4 = () => (
    <div>
      <h3>Order Product 4 - Ton</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
            <button
              className="button-Add"
              onClick={() => handleAddorder4Click()}
            >
              Add
            </button>
          </tr>
        </thead>
        <tbody>
          {ton.length > 0 ? (
            ton.map((ton) => (
              <tr key={ton.id}>
                <td>{ton.id}</td>
                <td>{ton.name}</td>
                <td>{ton.price}</td>
                <td>
                  <img
                    src={
                      ton.image
                        ? ton.image.startsWith("http")
                          ? ton.image
                          : `${
                              process.env.REACT_APP_IMAGE_BASE_URL || ""
                            }/${ton.image.replace(/\\/g, "/")}`
                        : "/path/to/default/image.jpg"
                    }
                    alt={ton.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="button-Edit"
                    onClick={() => handleTonEditClick(ton.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-Delete"
                    onClick={() => handleTonDeleteClick(ton.id)}
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

  const renderDeliveries = () => (
    <div>
      <h3>Delivery Management</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient Name</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>City</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.recipient_name}</td>
                <td>{delivery.address_line1}</td>
                <td>{delivery.address_line2 || "-"}</td>
                <td>{delivery.city}</td>
                <td>{delivery.state}</td>
                <td>{delivery.postal_code}</td>
                <td>{delivery.country}</td>
                <td>{delivery.phone_number || "-"}</td>
                <td>
                  <button
                    className="button-Edit"
                    // onClick={() => handleEditDeliveryClick(delivery.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-Delete"
                    // onClick={() => handleDeleteDeliveryClick(delivery.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No deliveries found</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <button className="button-Add" onClick={handleAddDeliveryClick}>
        Add New Delivery
      </button> */}
    </div>
  );

  const renderOrderlist = () => (
    <div>
      <h3>Order List</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Amount</th>
            <th>Order Date</th>
            <th>Slip Image</th>
            <th>Verified</th>
            <th>Receiver Name</th>
            <th>Sending Bank</th>
            <th>Transaction Date</th>
            <th>Transaction Time</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {orderlist.length > 0 ? (
            orderlist.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.total_amount}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                  {order.slip_image_url ? (
                    <img src={order.slip_image_url} alt="Slip" width="100" />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{order.slip_verified ? "Verified" : "Not Verified"}</td>
                <td>{order.receiver_name}</td>
                <td>{order.sending_bank}</td>
                <td>{order.trans_date}</td>
                <td>{order.trans_time}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <p>Product ID: {item.product_id}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.price}</p>
                    </div>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No orders found</td>
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
        return renderOrderProduct3();
      case "Order Product 4":
        return renderOrderProduct4(); 
      case "address":
        return renderDeliveries();
      case "Order list":
        return renderOrderlist();
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
          การไฟฟ้า
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Order Product 2")}
        >
          การประปา
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Order Product 3")}
        >
          โทรมนาคม
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Order Product 4")}
        >
          Order Product 4
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("address")}
        >
          address
        </button>
        <button
          className="sidebar-button"
          onClick={() => setCurrentPage("Order list")}
        >
          Order list
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
