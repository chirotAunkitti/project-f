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

// ลบสินค้า order Product 2
export const deletetags = async (tagsId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/address-tags/${tagsId}`);
    return response;
  } catch (error) {
    console.error('Error deleting collar:', error);
    throw error;
  }
};

// ลบสินค้า order Product 3
export const deleteordercollars = async (ordercollarsId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/ordercollars/${ordercollarsId}`);
    return response;
  } catch (error) {
    console.error('Error deleting collar:', error);
    throw error;
  }
};

// เพิ่ม สินค้า order Product1
export const addProder1 = async (prtder1Data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/ordersmart-collars', prtder1Data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// เพิ่ม สินค้า order Product2
export const addProder2 = async (prtder2Data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/orderaddress-tags', prtder2Data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};


// เพิ่ม สินค้า order Product3
export const addProder3 = async (prtder3Data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/order3collars', prtder3Data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// เพิ่ม สินค้า ในตะกร้า
export const addtocart = async (tocartData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/add-to-cart', tocartData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// ดึงข้อมูลสินค้าจากตะกร้า
export const cart = async (cartData) => {
  try {
    const response = await axios.get('http://localhost:8000/api/cart', cartData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// ลบสินค้า ในตะกร้า
    export const removecart = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8000/api/remove-from-cart/${id}`);
          return response;
        } catch (error) {
          console.error('Error deleting collar:', error);
          throw error;
        }
      };


//สำหรับสร้าง QR code จากตะกร้าสินค้า
export const qrcode = async (items, totalAmount) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/generateQR`, {
      items,
      totalAmount
    });
    return response.data;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};



export const deli = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/api/delivery', data);
    return response.data;
  } catch (error) {
    console.error('Error sending delivery data:', error.message);
    throw error;
  }
};

// ดึงข้อมูล ฟอร์มที่อยู่หน้า Admin
export const fetchddelivery = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/delivery-admin');
    return response.data;
  } catch (error) {
    console.error('Error fetching smart collars:', error);
    throw error;
  }
};

// บันทึกข้อมูลคำสั่งซื้อและสลิป
export const saveOrderToDatabase = async (orderData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/save-order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error saving order:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// ดึงข้อมูลคำสั่งซื้อสำหรับหน้า Admin
export const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/orders-admin');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};