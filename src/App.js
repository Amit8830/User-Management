import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import UserList from './Component/UserList';
import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';

function App() {
  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/edit/:id' element={<EditUser />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
