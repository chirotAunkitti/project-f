const express = require("express");
const router = express.Router();
const db = require("../../Database");
const multer = require("multer");
const { Client } = require("@line/bot-sdk");
const upload = multer({ dest: "uploads/", });
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const generatePayload = require("promptpay-qr");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // รับนามสกุลของไฟล์
    const fileName = `${uuidv4()}${fileExtension}`; // ตั้งชื่อไฟล์ใหม่
    cb(null, fileName);
  }
});

// เส้นทางสำหรับการลงทะเบียน
router.post("/register", (req, res) => {
  // รับข้อมูลจาก request body
  const { email, password, phone, address } = req.body;
  
  // ตรวจสอบว่ามีข้อมูลครบทุกช่องหรือไม่
  if (!email || !password || !phone || !address) {
    // ถ้าข้อมูลไม่ครบ ส่งข้อความแจ้งเตือนกลับไป
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
  }

  // สร้าง query สำหรับเพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
  const query =
    "INSERT INTO users (email, password, phone, address) VALUES (?, ?, ?, ?)";
  
  // ทำการ query ฐานข้อมูล
  db.query(query, [email, password, phone, address], (err, results) => {
    // ถ้าเกิดข้อผิดพลาดในการ query
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลงทะเบียนผู้ใช้ได้" });
    }
    
    // ถ้าสำเร็จ แสดงข้อความในคอนโซลและส่งข้อความตอบกลับ
    console.log("Registration successful:", results);
    res.status(201).json({ message: "ลงทะเบียนผู้ใช้สำเร็จ" });
  });
});

/// เส้นทางสำหรับการล็อกอิน
router.post("/login", (req, res) => {
  // รับข้อมูล email และ password จาก request body
  const { email, password } = req.body;

  // ตรวจสอบว่ามีทั้ง email และ password หรือไม่
  if (!email || !password) {
    return res.status(400).json({ message: "กรุณาระบุอีเมลและรหัสผ่าน" });
  }

  // สร้าง query เพื่อตรวจสอบ email และ password ในฐานข้อมูล
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  
  // ทำการ query ฐานข้อมูล
  db.query(query, [email, password], (err, results) => {
    // ถ้าเกิดข้อผิดพลาดในการ query
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "เกิดข้อผิดพลาดในการล็อกอิน" });
    }

    // ถ้าไม่พบผู้ใช้
    if (results.length === 0) {
      return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    // ถ้าพบผู้ใช้ ส่งข้อมูลผู้ใช้กลับไป
    const user = results[0];
    res.status(200).json({
      message: "ล็อกอินสำเร็จ",
      user: { id: user.id, email: user.email },
    });
  });
});

// เส้นทางสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" });
    }
    res.status(200).json(results);
  });
});

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้ตาม ID (สำหรับ Admin)
router.get("/users/:id", (req, res) => {
  // รับ ID จาก URL parameters
  const { id } = req.params;
  
  // สร้าง query เพื่อดึงข้อมูลผู้ใช้ตาม ID
  const query = "SELECT * FROM users WHERE id = ?";
  
  // ทำการ query ฐานข้อมูล
  db.query(query, [id], (err, results) => {
    // ถ้าเกิดข้อผิดพลาดในการ query
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" });
    }

    // ถ้าไม่พบผู้ใช้
    if (results.length === 0) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }

    // ส่งข้อมูลผู้ใช้กลับไป
    res.status(200).json(results[0]);
  });
});


// เส้นทางสำหรับการแก้ไขข้อมูลผู้ใช้ (สำหรับ Admin)
router.put("/users/:id", (req, res) => {
  // รับ ID จาก URL parameters และข้อมูลที่จะอัปเดตจาก request body
  const { id } = req.params;
  const { email, password, phone, address } = req.body;

  // ตรวจสอบว่ามีข้อมูลครบทุกช่องหรือไม่
  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
  }

  // สร้าง query สำหรับอัปเดตข้อมูลผู้ใช้
  const query =
    "UPDATE users SET email = ?, password = ?, phone = ?, address = ? WHERE id = ?";
  
  // ทำการ query ฐานข้อมูล
  db.query(query, [email, password, phone, address, id], (err, results) => {
    // ถ้าเกิดข้อผิดพลาดในการ query
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้" });
    }

    // ถ้าไม่พบผู้ใช้ที่ต้องการอัปเดต
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้ที่ต้องการอัปเดต" });
    }

    // ส่งข้อความแจ้งสำเร็จกลับไป
    res.status(200).json({ message: "อัปเดตข้อมูลผู้ใช้สำเร็จ" });
  });
});



// เส้นทางสำหรับการลบผู้ใช้ (สำหรับ Admin)
router.delete("/users/:id", (req, res) => {
  // รับ ID จาก URL parameters
  const { id } = req.params;
  
  // สร้าง query สำหรับลบผู้ใช้
  const query = "DELETE FROM users WHERE id = ?";
  
  // ทำการ query ฐานข้อมูล
  db.query(query, [id], (err, results) => {
    // ถ้าเกิดข้อผิดพลาดในการ query
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลบข้อมูลผู้ใช้ได้" });
    }

    // ถ้าไม่พบผู้ใช้ที่ต้องการลบ
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้ที่ต้องการลบ" });
    }

    // ส่งข้อความแจ้งสำเร็จกลับไป
    res.status(200).json({ message: "ลบข้อมูลผู้ใช้สำเร็จ" });
  });
});


// เส้นทางสำหรับการเพิ่มผู้ใช้ (สำหรับ Admin)
router.post("/users", (req, res) => {
  // รับข้อมูลจาก request body
  const { email, password, phone, address } = req.body;
  
  // ตรวจสอบว่ามีข้อมูลครบทุกช่องหรือไม่
  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
  }

  // สร้าง query สำหรับเพิ่มข้อมูลผู้ใช้ใหม่
  const query =
    "INSERT INTO users (email, password, phone, address) VALUES (?, ?, ?, ?)";
  
  // ทำการ query ฐานข้อมูล
  db.query(query, [email, password, phone, address], (err, results) => {
    // ถ้าเกิดข้อผิดพลาดในการ query
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถเพิ่มข้อมูลผู้ใช้ได้" });
    }

    // ส่งข้อความแจ้งสำเร็จกลับไป
    res.status(201).json({ message: "เพิ่มข้อมูลผู้ใช้สำเร็จ" });
  });
});


// เส้นทางสำหรับการดึงข้อมูลสินค้าทั้งหมด
router.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสินค้าได้" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null, // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.status(200).json(results);
  });
});

// เส้นทางสำหรับการดึงรายละเอียดสินค้าตาม ID
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถดึงรายละเอียดสินค้าได้" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้า" });
    }

    res.status(200).json(results[0]);
  });
});

// Admin ลบ สินค้าและรายละเอียดสินค้า
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลบข้อมูลสินค้าได้" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบข้อมูลสินค้าสำเร็จ" });
  });
});

// ตัวอย่างการกำหนดเส้นทางสำหรับการอัปเดตข้อมูลสินค้า Admin
// การอัปเดตข้อมูลสินค้าตาม ID
router.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const image = req.file ? req.file.path : null;

    // อัปเดตข้อมูลสินค้าในฐานข้อมูล
    const query =
      "UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?";
    db.query(query, [name, price, description, image, id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ message: "ไม่สามารถอัปเดตข้อมูลสินค้าได้" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการอัปเดต" });
      }

      res.status(200).json({ message: "อัปเดตข้อมูลสินค้าสำเร็จ" });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// ดึงข้อมูลผลิตภัณฑ์ตามหมวดหมู่
router.get("/order/:category", (req, res) => {
  const category = req.params.category;
  const tableNames = {
    "Smart collars": "smart_collars",
    "Address tags": "address_tags",
    "ton":"ton",
    Collars: "collars",
  };

  const tableName = tableNames[category];

  if (!tableName) {
    return res.status(400).json({ message: "ไม่พบสินค้าตามหมวดหมู่" });
  }

  const query = "SELECT * FROM " + tableName;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res
        .status(500)
        .json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null, // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

// ตัวอย่างเส้นทางสำหรับ smart collars
router.get("/orders/smart-collars", (req, res) => {
  const query = "SELECT * FROM smart_collars";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching smart collars:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null, // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

// เส้นทางสำหรับ address tags
router.get("/orders/address-tags", (req, res) => {
  const query = "SELECT * FROM address_tags";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching address tags:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null, // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

// เส้นทางสำหรับ collars
router.get("/orders/collars", (req, res) => {
  const query = "SELECT * FROM collars";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching collars:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null, // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

router.get("/orders/ton", (req, res) => {
  const query = "SELECT * FROM ton";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching ton:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null, // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

// ดึงข้อมูล ton ตาม ID เพื่อแสดงในหน้าแก้ไข
router.get("/ton/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM ton WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching smart collar:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Smart collar not found" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";
    const smartCollar = {
      ...results[0],
      image: results[0].image
        ? url + results[0].image.replace(/\\/g, "/")
        : null,
    };

    res.json(smartCollar);
  });
});

// การอัปเดตข้อมูล ton ตาม ID
router.put("/ton/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const image = req.file ? req.file.path : null;

    // อัปเดตข้อมูล smart collar ในฐานข้อมูล
    const query =
      "UPDATE ton SET name = ?, price = ?, image = ? WHERE id = ?";
    db.query(query, [name, price, image, id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "ไม่สามารถอัปเดตข้อมูลได้" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการอัปเดต" });
      }

      res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ" });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// ดึงข้อมูล smart collar ตาม ID เพื่อแสดงในหน้าแก้ไข
router.get("/smart-collars/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM smart_collars WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching smart collar:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Smart collar not found" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";
    const smartCollar = {
      ...results[0],
      image: results[0].image
        ? url + results[0].image.replace(/\\/g, "/")
        : null,
    };

    res.json(smartCollar);
  });
});

// การอัปเดตข้อมูล smart collar ตาม ID
router.put("/smart-collars/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const image = req.file ? req.file.path : null;

    // อัปเดตข้อมูล smart collar ในฐานข้อมูล
    const query =
      "UPDATE smart_collars SET name = ?, price = ?, image = ? WHERE id = ?";
    db.query(query, [name, price, image, id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "ไม่สามารถอัปเดตข้อมูลได้" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการอัปเดต" });
      }

      res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ" });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// ดึงข้อมูล address tag ตาม ID เพื่อแสดงในหน้าแก้ไข
router.get("/address-tags/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM address_tags WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching address tag:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Address tag not found" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";
    const addressTag = {
      ...results[0],
      image: results[0].image
        ? url + results[0].image.replace(/\\/g, "/")
        : null,
    };

    res.json(addressTag);
  });
});

// อัปเดตข้อมูล address tag ตาม ID
router.put("/address-tags/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const image = req.file ? req.file.path : null;

    // อัปเดตข้อมูล address tag ในฐานข้อมูล
    const query =
      "UPDATE address_tags SET name = ?, price = ?, image = ? WHERE id = ?";
    db.query(query, [name, price, image, id], (err, results) => {
      if (err) {
        console.error("Error updating address tag:", err);
        return res.status(500).json({ message: "ไม่สามารถอัปเดตข้อมูลได้" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการอัปเดต" });
      }

      res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ" });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// ดึงข้อมูล collar ตาม ID
router.get("/collars/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM collars WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching collar:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Collar not found" });
    }

    const url = req.protocol + "://" + req.get("host") + "/";
    const collar = {
      ...results[0],
      image: results[0].image
        ? url + results[0].image.replace(/\\/g, "/")
        : null,
    };

    res.json(collar);
  });
});

// อัปเดตข้อมูล collar
router.put("/collars/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  const image = req.file ? req.file.path : null;

  const query =
    "UPDATE collars SET name = ?, price = ?, image = ? WHERE id = ?";

  db.query(query, [name, price, image, id], (err, result) => {
    if (err) {
      console.error("Error updating collar:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Collar not found" });
    }

    res.json({ message: "Collar updated successfully" });
  });
});

//ลบ order product1

router.delete("/smart-collars/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM smart_collars WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลบข้อมูลสินค้าได้" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบข้อมูลสินค้าสำเร็จ" });
  });
});

//ลบ order product2
router.delete("/address-tags/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM address_tags WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลบข้อมูลสินค้าได้" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบข้อมูลสินค้าสำเร็จ" });
  });
});

//ลบ order product3
router.delete("/ordercollars/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM collars WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลบข้อมูลสินค้าได้" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบข้อมูลสินค้าสำเร็จ" });
  });
});

//ลบ order product4
router.delete("/ton/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM ton WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลบข้อมูลสินค้าได้" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบข้อมูลสินค้าสำเร็จ" });
  });
});

// API สำหรับเพิ่มสินค้าใหม่ใน smart_collars
router.post("/smart-collars", (req, res) => {
  const { name, price, image } = req.body;

  // ตรวจสอบข้อมูลที่ได้รับจาก request
  if (!name || !price || !image) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const query =
    "INSERT INTO smart_collars (name, price, image) VALUES (?, ?, ?)";

  db.query(query, [name, price, image], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถเพิ่มสินค้าลงในฐานข้อมูลได้" });
    }

    res
      .status(201)
      .json({ message: "เพิ่มสินค้าสำเร็จ", productId: results.insertId });
  });
});

// API สำหรับเพิ่มสินค้าใหม่ใน smart_collars

router.post("/ordersmart-collars", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const query =
    "INSERT INTO smart_collars (name, price, image) VALUES (?, ?, ?)";

  db.query(query, [name, price, image], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถเพิ่มสินค้าลงในฐานข้อมูลได้" });
    }

    res.status(201).json({
      message: "เพิ่มสินค้าสำเร็จ",
      product: { id: results.insertId, name, price, image },
    });
  });
});

// API สำหรับเพิ่มสินค้าใหม่ใน address_tags

router.post("/orderaddress-tags", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const query =
    "INSERT INTO address_tags (name, price, image) VALUES (?, ?, ?)";

  db.query(query, [name, price, image], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถเพิ่มสินค้าลงในฐานข้อมูลได้" });
    }

    res.status(201).json({
      message: "เพิ่มสินค้าสำเร็จ",
      product: { id: results.insertId, name, price, image },
    });
  });
});

// API สำหรับเพิ่มสินค้าใหม่ใน collars

router.post("/order3collars", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const query = "INSERT INTO collars (name, price, image) VALUES (?, ?, ?)";

  db.query(query, [name, price, image], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถเพิ่มสินค้าลงในฐานข้อมูลได้" });
    }

    res.status(201).json({
      message: "เพิ่มสินค้าสำเร็จ",
      product: { id: results.insertId, name, price, image },
    });
  });
});

// API สำหรับเพิ่มสินค้าใหม่ใน ton

router.post("/order4ton", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const query = "INSERT INTO ton (name, price, image) VALUES (?, ?, ?)";

  db.query(query, [name, price, image], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถเพิ่มสินค้าลงในฐานข้อมูลได้" });
    }

    res.status(201).json({
      message: "เพิ่มสินค้าสำเร็จ",
      product: { id: results.insertId, name, price, image },
    });
  });
});

// เพิ่มสินค้าหรืออัปเดตปริมาณสินค้าที่มีอยู่ในตะกร้า
router.post("/add-to-cart", (req, res) => {
  const { productId, productName, productImage, productPrice } = req.body;

  // ตรวจสอบว่ามีสินค้านี้ในตะกร้าหรือไม่
  const sqlCheck = "SELECT * FROM ShoppingCart WHERE productId = ?";
  db.query(sqlCheck, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (result.length > 0) {
      // หากมีสินค้าอยู่แล้วในตะกร้า ให้เพิ่มปริมาณ
      const sqlUpdate =
        "UPDATE ShoppingCart SET quantity = quantity + 1 WHERE productId = ?";
      db.query(sqlUpdate, [productId], (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send("Product quantity updated in cart");
      });
    } else {
      // หากไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้าใหม่
      const sqlInsert =
        "INSERT INTO ShoppingCart (productId, productName, productImage, productPrice, quantity) VALUES (?, ?, ?, ?, ?)";
      db.query(
        sqlInsert,
        [productId, productName, productImage, productPrice, 1],
        (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.send("Product added to cart");
        }
      );
    }
  });
});

// ดึงข้อมูลสินค้าจากตะกร้า
router.get("/cart", (req, res) => {
  const sqlSelect = "SELECT * FROM ShoppingCart";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// ลบสินค้าจากตะกร้า
router.delete("/remove-from-cart/:id", (req, res) => {
  const productId = req.params.id;
  const sqlDelete = "DELETE FROM ShoppingCart WHERE productId = ?";
  db.query(sqlDelete, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("Product removed from cart");
  });
});


// Qr Code
router.post("/generateQR", async (req, res) => {
  try {
    // รับข้อมูลจาก request body แทนการดึงจากฐานข้อมูล
    const { items, totalAmount } = req.body;

    // คำนวณยอดรวมจากข้อมูลที่ส่งมา (ถ้าไม่มี totalAmount)
    const amount =
      totalAmount ||
      items.reduce((sum, item) => sum + item.price * item.quantity, 0); // จำนวนเงินในหน่วยบาท

    const mobileNumber = "0956721589"; // หมายเลขโทรศัพท์ที่ใช้ในการชำระเงิน
    const payload = generatePayload(mobileNumber, { amount });
    const option = {
      color: {
        dark: "#000",
        light: "#fff",
      },
    };

    QRCode.toDataURL(payload, option, (err, url) => {
      if (err) {
        console.log("Generate QR Code failed");
        return res.status(400).json({
          RespCode: 400,
          RespMessage: "Bad request: " + err,
        });
      } else {
        return res.status(200).json({
          RespCode: 200,
          RespMessage: "Success",
          Result: url,
        });
      }
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({
      RespCode: 500,
      RespMessage: "Server error",
    });
  }
});

//บันทึกข้อมูล ฟอร์ม ที่อยู่
router.post("/delivery", (req, res) => {
  const {
    recipient_name,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    phone_number,
  } = req.body;

  // ตรวจสอบค่าที่ส่งเข้ามา
  if (
    !recipient_name ||
    !address_line1 ||
    !address_line2 ||
    !city ||
    !state ||
    !postal_code ||
    !country ||
    !phone_number
  ) {
    return res.status(400).send("Missing required fields");
  }

  const sql =
    "INSERT INTO delivery (recipient_name, address_line1, address_line2, city, state, postal_code, country, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    recipient_name,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    phone_number,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).send("Error inserting data into the database");
    }
    return res.status(201).send("Delivery information saved successfully");
  });
});


// ดึงข้อมูล แบบฟอร์ม ที่อยู่ หน้า Admin
router.get("/delivery-admin", (req, res) => {
  const query = "SELECT * FROM delivery";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถดึงข้อมูลได้" });
    }
    res.status(200).json(results);
  });
});


router.post("/save-order", upload.single('slipImage'), (req, res) => {
  console.log("Received request body:", req.body);
  console.log("Received file:", req.file);

  try {
    const { items, totalAmount, slipData } = req.body;

    // ตรวจสอบว่า slipData เป็น string หรือไม่ ถ้าใช่ให้แปลงเป็น object
    const parsedSlipData = typeof slipData === 'string' ? JSON.parse(slipData) : slipData;

    if (!req.file || !parsedSlipData.receiverName || !parsedSlipData.sendingBank || !parsedSlipData.transDate || !parsedSlipData.transTime) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    const query = `INSERT INTO orders (user_id, total_amount, slip_image_url, receiver_name, sending_bank, trans_date, trans_time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      query,
      [
        1, // สมมติว่า user_id เป็น 1
        totalAmount,
        req.file.filename,
        parsedSlipData.receiverName,
        parsedSlipData.sendingBank,
        parsedSlipData.transDate,
        parsedSlipData.transTime,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error when inserting order:", err);
          return res.status(500).json({ message: "ไม่สามารถบันทึกข้อมูลได้", error: err.message });
        }

        const orderId = result.insertId;
        const itemsQuery = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
        const itemsValues = JSON.parse(items).map((item) => [
          orderId,
          item.id,
          item.quantity,
          item.price,
        ]);

        db.query(itemsQuery, [itemsValues], (err) => {
          if (err) {
            console.error("Database error when inserting order items:", err);
            return res.status(500).json({ message: "ไม่สามารถบันทึกรายการสินค้าได้", error: err.message });
          }
          res.status(201).json({ message: "บันทึกคำสั่งซื้อเรียบร้อยแล้ว", orderId });
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่ไม่คาดคิด", error: error.message });
  }
});



// ดึงข้อมูลคำสั่งซื้อสำหรับหน้า Admin
router.get("/orders-admin", (req, res) => {
  const query = `
    SELECT o.*, oi.product_id, oi.quantity, oi.price, p.image
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถดึงข้อมูลได้" });
    }

    const url = req.protocol + "://" + req.get("host") + "/uploads/";

    const formattedResults = results.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          user_id: row.user_id,
          total_amount: row.total_amount,
          order_date: row.order_date,
          slip_image_url: row.slip_image_url
            ? url + row.slip_image_url.replace(/\\/g, "/")
            : null,
          slip_verified: row.slip_verified,
          receiver_name: row.receiver_name,
          sending_bank: row.sending_bank,
          trans_date: row.trans_date,
          trans_time: row.trans_time,
          items: [],
        };
      }

      if (row.product_id) {
        acc[row.id].items.push({
          product_id: row.product_id,
          quantity: row.quantity,
          price: row.price,
          image: row.image ? url + row.image.replace(/\\/g, "/") : null, // เพิ่มการปรับแต่ง URL ของรูปภาพสินค้า
        });
      }

      return acc;
    }, {});

    res.status(200).json(Object.values(formattedResults));
  });
});



module.exports = router;
