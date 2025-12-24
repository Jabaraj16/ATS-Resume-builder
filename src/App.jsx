import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Builder from './pages/Builder';
import Register from './pages/Register';
import TemplateSelection from './pages/TemplateSelection';
import ATSChecker from './pages/ATSChecker';

import { AuthProvider } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import Logo from './components/Logo';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

import { useAuth } from './contexts/AuthContext';

import { useNavigate } from 'react-router-dom';
import Modal from './components/Modal';
import { useState } from 'react';

const NavLinks = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowLogoutConfirm(false);
    // Optional: toast.success('Logged out successfully'); 
  };

  return (
    <>
      {user ? (
        <>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Hi, {user.name}</span>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem' }}
          >
            Logout
          </button>

          <Modal
            isOpen={showLogoutConfirm}
            onClose={() => setShowLogoutConfirm(false)}
            title="Confirm Logout"
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
                Are you sure you want to log out?
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-ghost" style={{ textDecoration: 'none' }}>Login</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>Sign Up</Link>
        </>
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <Toaster position="top-right" toastOptions={{
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }
          }} />
          <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav className="glass-panel" style={{
              padding: '0.75rem 0',
              position: 'sticky',
              top: 0,
              zIndex: 50,
              borderBottom: 'none'
            }}>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Logo />
                </Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <NavLinks />
                </div>
              </div>
            </nav>
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="/ats-check" element={<ATSChecker />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/templates" element={<TemplateSelection />} />
                <Route path="/builder" element={<Builder />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
