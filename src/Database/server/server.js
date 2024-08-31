// require('dotenv').config(); // โหลดค่า environment variables

const express = require('express');
const cors = require('cors');
const db = require('../Database');  // เส้นทางที่ถูกต้อง
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
const port = 8000;


// ตั้งค่า middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ใช้งานเส้นทางจาก authRoutes
app.use('/api', authRoutes);

// Middleware สำหรับจัดการข้อผิดพลาดทั่วไป
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  res.status(500).json({ message: 'เกิดข้อผิดพลาดบางอย่าง' });
});

// เริ่มต้น server
app.listen(port, () => {
    console.log(`Server กำลังทำงานที่พอร์ต ${port}`);
});