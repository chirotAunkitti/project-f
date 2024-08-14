import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export { fetchUsers };


//deleteUser
export const deleteUser = async (userId) => {
    const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE',
    });
    return response;
  };

  // addUser
export const addUser = async (userData) => {
    const response = await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
  
    return await response.json();
  };
  