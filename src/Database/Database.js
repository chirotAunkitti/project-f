const mysql = require('mysql2');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // เปลี่ยนเป็น username ของคุณ
  password: '', // เปลี่ยนเป็น password ของคุณ
  database: 'project_f'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected');
  }
});

module.exports = db;
 