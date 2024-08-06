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

module.exports = router;