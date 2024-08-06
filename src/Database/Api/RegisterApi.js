// const express = require('express');
// const cors = require('cors');
// const db = require('../Database'); // import การเชื่อมต่อฐานข้อมูล

// const app = express();
// const port = 8000;

// // ตั้งค่า middleware
// app.use(cors({
//   origin: 'http://localhost:3000'  // หรือ URL ของ frontend ของคุณ
// }));
// app.use(express.json());

// // Middleware สำหรับ logging requests
// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request to ${req.path}`);
//   next();
// });

// // เส้นทางสำหรับการลงทะเบียน
// app.post('/api/register', (req, res) => {
//   const { email, password, phone, address } = req.body;

//   if (!email || !password || !phone || !address) {
//     return res.status(400).json({ message: 'Please provide all required fields.' });
//   }

//   const query = 'INSERT INTO users (email, password, phone, address) VALUES (?, ?, ?, ?)';
//   db.query(query, [email, password, phone, address], (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ message: 'Failed to register user.' });
//     }
//     res.status(201).json({ message: 'User registered successfully.' });
//   });
// });

// // Middleware สำหรับจัดการข้อผิดพลาดทั่วไป
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // เริ่มต้น server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// // จัดการการปิดแอปพลิเคชันอย่างสง่างาม
// process.on('SIGINT', () => {
//   db.end((err) => {
//     if (err) {
//       console.error('Error closing database connection:', err);
//     } else {
//       console.log('Database connection closed.');
//     }
//     process.exit(0);
//   });
// });