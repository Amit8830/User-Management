import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const editUser = (userId, updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <UserContext.Provider
      value={{ users, addUser, editUser, deleteUser, setUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};
