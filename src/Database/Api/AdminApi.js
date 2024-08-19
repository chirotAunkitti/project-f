import axios from 'axios';

// ดึงข้อมูลผู้ใช้ทั้งหมด
export const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// ลบผู้ใช้
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/users/${userId}`);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// เพิ่มผู้ใช้
export const addUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users', userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// ดึงข้อมูลสินค้าทั้งหมด
export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// ดึงรายละเอียดสินค้าตาม ID
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// ลบสินค้า
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/products/${productId}`);
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// ดึงข้อมูลสินค้าตามหมวดหมู่
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/order/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// ดึงข้อมูล smart collars
export const fetchSmartCollars = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/orders/smart-collars');
    return response.data;
  } catch (error) {
    console.error('Error fetching smart collars:', error);
    throw error;
  }
};

// ดึงข้อมูล address tags
export const fetchAddressTags = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/orders/address-tags');
    return response.data;
  } catch (error) {
    console.error('Error fetching address tags:', error);
    throw error;
  }
};

// ดึงข้อมูล collars
export const fetchCollars = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/orders/collars');
    return response.data;
  } catch (error) {
    console.error('Error fetching collars:', error);
    throw error;
  }
};

// ดึงข้อมูล Smart Collar ตาม ID
export const fetchSmartCollar = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/smart-collars/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching smart collar:', error);
    throw error;
  }
};

// ดึงข้อมูล address-tags
export const fetchaddress = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/address-tags/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching smart collar:', error);
    throw error;
  }
};

// ดึงข้อมูล /collars
export const fetchcollars = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/collars/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching smart collar:', error);
    throw error;
  }
};

// ลบสินค้า order Product 1
export const deletecollars = async (collarsId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/smart-collars/${collarsId}`);
    return response;
  } catch (error) {
    console.error('Error deleting collar:', error);
    throw error;
  }
};

