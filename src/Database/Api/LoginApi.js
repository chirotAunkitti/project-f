const express = require('express');
const cors = require('cors');
const db = require('../../Database');  // import การเชื่อมต่อฐานข้อมูล

const app = express();
const port = 8000;

// ตั้งค่า middleware
app.use(cors({
  origin: 'http://localhost:3000'  // หรือ URL ของ frontend ของคุณ
}));
app.use(express.json());

// Middleware สำหรับ logging requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

// เส้นทางสำหรับการลงทะเบียน
app.post('/api/register', (req, res) => {
  const { email, password, phone, address } = req.body;

  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }

  const query = 'INSERT INTO users (email, password, phone, address) VALUES (?, ?, ?, ?)';
  db.query(query, [email, password, phone, address], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'ไม่สามารถลงทะเบียนผู้ใช้ได้' });
    }
    console.log('Registration successful:', results);
    res.status(201).json({ message: 'ลงทะเบียนผู้ใช้สำเร็จ' });
  });
});

// เส้นทางสำหรับการล็อกอิน
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'กรุณาระบุอีเมลและรหัสผ่าน' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการล็อกอิน' });
    }

    if (results.length === 0) {
      console.log('User not found or incorrect password:', email);
      return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    const user = results[0];
    res.status(200).json({ message: 'ล็อกอินสำเร็จ', user: { id: user.id, email: user.email } });
  });
});

// Middleware สำหรับจัดการข้อผิดพลาดทั่วไป
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  res.status(500).send('เกิดข้อผิดพลาดบางอย่าง');
});

// เริ่มต้น server
app.listen(port, () => {
    console.log(`Server กำลังทำงานที่พอร์ต ${port}`);
});

// จัดการการปิดแอปพลิเคชันอย่างสง่างาม
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการปิดการเชื่อมต่อฐานข้อมูล:', err);
    } else {
      console.log('ปิดการเชื่อมต่อฐานข้อมูลเรียบร้อยแล้ว');
    }
    process.exit(0);
  });
});