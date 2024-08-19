const express = require("express");
const router = express.Router();
const db = require("../../Database"); // เส้นทางถูกต้อง
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const bcrypt = require("bcrypt");

// เส้นทางสำหรับการลงทะเบียน
router.post("/register", (req, res) => {
  const { email, password, phone, address } = req.body;
  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
  }

  const query =
    "INSERT INTO users (email, password, phone, address) VALUES (?, ?, ?, ?)";
  db.query(query, [email, password, phone, address], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลงทะเบียนผู้ใช้ได้" });
    }
    console.log("Registration successful:", results);
    res.status(201).json({ message: "ลงทะเบียนผู้ใช้สำเร็จ" });
  });
});

// เส้นทางสำหรับการล็อกอิน
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "กรุณาระบุอีเมลและรหัสผ่าน" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "เกิดข้อผิดพลาดในการล็อกอิน" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    const user = results[0];
    res
      .status(200)
      .json({
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

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้ตาม ID Admin
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }

    res.status(200).json(results[0]);
  });
});

// เส้นทางสำหรับการแก้ไขข้อมูลผู้ใช้  user Admin
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { email, password, phone, address } = req.body;

  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
  }

  const query =
    "UPDATE users SET email = ?, password = ?, phone = ?, address = ? WHERE id = ?";
  db.query(query, [email, password, phone, address, id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้ที่ต้องการอัปเดต" });
    }

    res.status(200).json({ message: "อัปเดตข้อมูลผู้ใช้สำเร็จ" });
  });
});

// เส้นทางสำหรับการลบผู้ใช้ Admin
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถลบข้อมูลผู้ใช้ได้" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้ที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบข้อมูลผู้ใช้สำเร็จ" });
  });
});

// เส้นทางสำหรับการเพิ่มผู้ใช้ Admin
router.post("/users", (req, res) => {
  const { email, password, phone, address } = req.body;
  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
  }

  const query =
    "INSERT INTO users (email, password, phone, address) VALUES (?, ?, ?, ?)";
  db.query(query, [email, password, phone, address], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "ไม่สามารถเพิ่มข้อมูลผู้ใช้ได้" });
    }

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
      image: item.image ? url + item.image.replace(/\\/g, "/") : null,  // ตรวจสอบว่าค่า image เป็น null หรือไม่
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
router.get('/order/:category', (req, res) => {
  const category = req.params.category;
  const tableNames = {
    'Smart collars': 'smart_collars',
    'Address tags': 'address_tags',
    'Collars': 'collars'
  };

  const tableName = tableNames[category];

  if (!tableName) {
    return res.status(400).json({ message: 'ไม่พบสินค้าตามหมวดหมู่' });
  }

  const query = 'SELECT * FROM ' + tableName;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null,  // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});


// ตัวอย่างเส้นทางสำหรับ smart collars
router.get('/orders/smart-collars', (req, res) => {
  const query = 'SELECT * FROM smart_collars';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching smart collars:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null,  // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

// เส้นทางสำหรับ address tags
router.get('/orders/address-tags', (req, res) => {
  const query = 'SELECT * FROM address_tags';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching address tags:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null,  // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

// เส้นทางสำหรับ collars
router.get('/orders/collars', (req, res) => {
  const query = 'SELECT * FROM collars';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching collars:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const url = req.protocol + "://" + req.get("host") + "/";

    results = results.map((item) => ({
      ...item,
      image: item.image ? url + item.image.replace(/\\/g, "/") : null,  // ตรวจสอบว่าค่า image เป็น null หรือไม่
    }));

    res.json(results);
  });
});

// ดึงข้อมูล smart collar ตาม ID เพื่อแสดงในหน้าแก้ไข
router.get('/smart-collars/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM smart_collars WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching smart collar:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Smart collar not found' });
    }

    const url = req.protocol + "://" + req.get("host") + "/";
    const smartCollar = {
      ...results[0],
      image: results[0].image ? url + results[0].image.replace(/\\/g, "/") : null,
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
    const query = "UPDATE smart_collars SET name = ?, price = ?, image = ? WHERE id = ?";
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
router.get('/address-tags/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM address_tags WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching address tag:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Address tag not found' });
    }

    const url = req.protocol + "://" + req.get("host") + "/";
    const addressTag = {
      ...results[0],
      image: results[0].image ? url + results[0].image.replace(/\\/g, "/") : null,
    };

    res.json(addressTag);
  });
});

// อัปเดตข้อมูล address tag ตาม ID
router.put('/address-tags/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const image = req.file ? req.file.path : null;

    // อัปเดตข้อมูล address tag ในฐานข้อมูล
    const query = 'UPDATE address_tags SET name = ?, price = ?, image = ? WHERE id = ?';
    db.query(query, [name, price, image, id], (err, results) => {
      if (err) {
        console.error('Error updating address tag:', err);
        return res.status(500).json({ message: 'ไม่สามารถอัปเดตข้อมูลได้' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลที่ต้องการอัปเดต' });
      }

      res.status(200).json({ message: 'อัปเดตข้อมูลสำเร็จ' });
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// ดึงข้อมูล collar ตาม ID
router.get('/collars/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM collars WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching collar:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Collar not found' });
    }

    const url = req.protocol + "://" + req.get("host") + "/";
    const collar = {
      ...results[0],
      image: results[0].image ? url + results[0].image.replace(/\\/g, "/") : null,
    };

    res.json(collar);
  });
});

// อัปเดตข้อมูล collar
router.put('/collars/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  const image = req.file ? req.file.path : null;

  const query = 'UPDATE collars SET name = ?, price = ?, image = ? WHERE id = ?';

  db.query(query, [name, price, image, id], (err, result) => {
    if (err) {
      console.error('Error updating collar:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Collar not found' });
    }

    res.json({ message: 'Collar updated successfully' });
  });
});


//ลบ order product1

router.delete('/smart-collars/:id', (req, res) => {
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


module.exports = router;
