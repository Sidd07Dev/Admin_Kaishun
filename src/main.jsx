import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';
import {  HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.jsx';
import Layout from './Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Student from './pages/Student.jsx';
import ManageTest from './pages/ManageTest.jsx';
import ResultsManagement from './pages/ResultsManagement.jsx';
import Gallery from './pages/Gallery.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx'; // ✅ new util

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ❌ Login has no sidebar */}
      <Route path="/login" element={<Login />} />

      {/* ✅ Protected Routes (with sidebar) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/students" element={<Student />} />
        <Route path="/tests" element={<ManageTest />} />
        <Route path="/results" element={<ResultsManagement />} />
        <Route path="/gallery" element={<Gallery />} />
      </Route>

      {/* Redirect any unknown route to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
      <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
