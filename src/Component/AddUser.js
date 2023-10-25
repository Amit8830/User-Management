import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const AddUser = () => {
  const { users, setUsers } = useContext(UserContext);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  function generateUniqueId() {
    return Date.now().toString();
  }

  const handleAddUser = () => {
    const userToAdd = {
      id: generateUniqueId(),
      ...newUser,
    };

    setUsers([...users, userToAdd]); // Update the users state
    setNewUser({ name: '', email: '', password: '', role: 'User' });
  };

  return (
    <div>
      <h2>Add User</h2>
      <form>
        <input
          type='text'
          placeholder='Name'
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type='email'
          placeholder='Email'
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value='User'>User</option>
          <option value='Admin'>Admin</option>
        </select>
        <button type='button' onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
