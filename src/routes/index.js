import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserListPage from '../pages/UserList';
import UserCreatePage from '../pages/UserCreate';
import UserViewPage from '../pages/UserView';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/create" element={<UserCreatePage />} />
        <Route path="/users/:id" element={<UserViewPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;