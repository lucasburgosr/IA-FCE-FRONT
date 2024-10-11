// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatWindow from '../pages/Chat';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
