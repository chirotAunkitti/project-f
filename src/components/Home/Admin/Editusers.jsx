import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Editusers.css";

function Editusers() {
  const { id } = useParams(); // ดึง ID จาก URL parameters
  const navigate = useNavigate(); // สร้าง instance ของ useNavigate
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        if (!id) {
          throw new Error("User ID is missing");
        }
        const response = await fetch(`http://localhost:8000/api/users/${id}`); // ใช้ ID ที่มาจาก URL
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setEmail(userData.email);
          setPassword(userData.password);
          setPhone(userData.phone);
          setAddress(userData.address);
        } else {
          alert("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserById();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        // ใช้ ID ที่มาจาก URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          phone,
          address,
        }),
      });
      if (response.ok) {
        alert("User updated successfully!");
        navigate("/admin"); // นำทางกลับไปยังหน้าหลักหรือหน้าอื่นที่ต้องการ
      } else {
        alert("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editusers-container">
      <h2>Edit User</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button className="back-button">
        <Link to="/admin" className="back-link">
          Back to Admin
        </Link>
      </button>
    </div>
  );
}

export default Editusers;
