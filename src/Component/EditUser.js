import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const EditUser = () => {
  const { users, setUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  useEffect(() => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditedUser(userToEdit);
    }
  }, [id, users]);

  const handleEditUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...editedUser } : user
    );

    setUsers(updatedUsers);
    navigate('/');
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form>
        <input
          type='text'
          placeholder='Name'
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <input
          type='email'
          placeholder='Email'
          value={editedUser.email}
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
          }
        />
        <input
          type='password'
          placeholder='Password'
          value={editedUser.password}
          onChange={(e) =>
            setEditedUser({ ...editedUser, password: e.target.value })
          }
        />
        <select
          value={editedUser.role}
          onChange={(e) =>
            setEditedUser({ ...editedUser, role: e.target.value })
          }
        >
          <option value='User'>User</option>
          <option value='Admin'>Admin</option>
        </select>
        <button type='button' onClick={handleEditUser}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;
