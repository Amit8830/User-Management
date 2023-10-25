import React, { useState } from 'react';

const UserDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]);
  const [editingUserId, setEditingUserId] = useState(null); // Track which user is being edited

  // State for the form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  // Add state variables for sorting and filtering
  const [sortKey, setSortKey] = useState('id'); // Default sorting by user ID
  const [filterRole, setFilterRole] = useState(''); // Default filter (no filter)
  // const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('API_ENDPOINT');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  // Function to sort the user list based on the chosen key
  const sortUsers = (key) => {
    setSortKey(key);
    const sortedUsers = [...users].sort((a, b) => {
      if (key === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a[key] - b[key];
    });
    setUsers(sortedUsers);
  };

  // Function to filter the user list based on the chosen role
  const filterUsers = () => {
    const filteredUsers = users.filter(
      (user) => !filterRole || user.role === filterRole
    );
    setUsers(filteredUsers);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to add a new user
  const addUser = () => {
    // Perform validation here if needed
    // Generate a unique user ID
    const newUserId = users.length + 1;
    const newUser = { id: newUserId, ...formData };
    setUsers([...users, newUser]);
  };

  const editUser = (id) => {
    // Set the editing user ID to enable the edit form
    setEditingUserId(id);

    // Pre-fill the edit form with user data
    const userToEdit = users.find((user) => user.id === id);
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
    });
  };

  const saveEditedUser = () => {
    // Find the user being edited in the users array and update their data
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, ...formData } : user
    );

    setUsers(updatedUsers);
    setEditingUserId(null); // Reset the editing user ID
  };

  // Function to delete a user
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <h2>User List</h2>

      <div>
        <label>Sort By:</label>
        <select value={sortKey} onChange={(e) => sortUsers(e.target.value)}>
          <option value='id'>User ID</option>
          <option value='name'>Name</option>
        </select>

        <label>Filter By Role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value=''>All Roles</option>
          <option value='Admin'>Admin</option>
          <option value='User'>User</option>
        </select>
        <button onClick={filterUsers}>Apply Filter</button>
      </div>

      
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => editUser(user.id)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUserId && (
        <div>
          <h2>Edit User</h2>
          <form>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
            />
            <select
              name='role'
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value='Admin'>Admin</option>
              <option value='User'>User</option>
            </select>
            <button type='button' onClick={saveEditedUser}>
              Save User
            </button>
          </form>
        </div>
      )}

      <h2>Add User</h2>
      <form>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
        />
        <select name='role' value={formData.role} onChange={handleInputChange}>
          <option value='Admin'>Admin</option>
          <option value='User'>User</option>
        </select>
        <button type='button' onClick={addUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserDashboard;
