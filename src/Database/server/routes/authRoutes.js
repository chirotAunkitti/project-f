const express = require('express');
const router = express.Router();
const db = require('../../Database');  // เส้นทางถูกต้อง
const bcrypt = require('bcrypt');

// เส้นทางสำหรับการลงทะเบียน
router.post('/register', (req, res) => {
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
router.post('/login', (req, res) => {
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
      return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    const user = results[0];
    res.status(200).json({ message: 'ล็อกอินสำเร็จ', user: { id: user.id, email: user.email } });
  });
});

// เส้นทางสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' });
    }
    res.status(200).json(results);
  });
});


// เส้นทางสำหรับการดึงข้อมูลผู้ใช้ตาม ID Admin
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้' });
    }

    res.status(200).json(results[0]);
  });
});


// เส้นทางสำหรับการแก้ไขข้อมูลผู้ใช้  user Admin
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { email, password, phone, address } = req.body;

  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }

  const query = 'UPDATE users SET email = ?, password = ?, phone = ?, address = ? WHERE id = ?';
  db.query(query, [email, password, phone, address, id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการอัปเดต' });
    }

    res.status(200).json({ message: 'อัปเดตข้อมูลผู้ใช้สำเร็จ' });
  });
});


// เส้นทางสำหรับการลบผู้ใช้ Admin
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'ไม่สามารถลบข้อมูลผู้ใช้ได้' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการลบ' });
    }

    res.status(200).json({ message: 'ลบข้อมูลผู้ใช้สำเร็จ' });
  });
});

// เส้นทางสำหรับการเพิ่มผู้ใช้ Admin
router.post('/users', (req, res) => {
  const { email, password, phone, address } = req.body;
  if (!email || !password || !phone || !address) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }

  const query = 'INSERT INTO users (email, password, phone, address) VALUES (?, ?, ?, ?)';
  db.query(query, [email, password, phone, address], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'ไม่สามารถเพิ่มข้อมูลผู้ใช้ได้' });
    }

    res.status(201).json({ message: 'เพิ่มข้อมูลผู้ใช้สำเร็จ' });
  });
});



module.exports = router;