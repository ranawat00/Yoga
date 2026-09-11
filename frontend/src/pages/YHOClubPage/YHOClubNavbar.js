import React, { useState } from 'react';
import './YHOClubNavbar.css';
import { useApp } from '../../hooks/useApp';
import yhoClubLogo from '../../assets/yho_club/logo.png';
import YHOClubProfileDrawer from './YHOClubProfileDrawer';

export default function YHOClubNavbar() {
  const { user, setView, setIsRegisterModalOpen } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const studentId = user
    ? (user.studentId || ('YHO-' + (user._id || '2026').slice(-6).toUpperCase()))
    : '';

  return (
    <>
      <nav className="yhon-bar">
        <div className="yhon-inner">

          {/* LEFT: Official Logo */}
          <div className="yhon-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={yhoClubLogo} alt="YHO Club" className="yhon-brand-logo-img" />
          </div>

          {/* CENTER: Nav links (desktop) */}
          <ul className="yhon-links">
            <li>
              <span className="yhon-link yhon-link--active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Home
              </span>
            </li>
            <li>
              <span className="yhon-link" onClick={() => setIsRegisterModalOpen && setIsRegisterModalOpen(true)}>
                Free Workshop
              </span>
            </li>
            <li>
              <span className="yhon-link" onClick={() => setView('home')}>
                Main Site
              </span>
            </li>
          </ul>

          {/* RIGHT: Profile Trigger (opens dedicated YHO Club Profile Drawer from right) */}
          <div className="yhon-actions">
            {user && (
              <button
                type="button"
                className="yhon-student-chip"
                onClick={() => setIsDrawerOpen(true)}
                title="Open Student Profile"
                aria-label="Open Student Profile Drawer"
              >
                <div className="yhon-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="yhon-student-info">
                  <span className="yhon-student-name">{user.name}</span>
                  <span className="yhon-student-id">🎓 {studentId}</span>
                </div>
              </button>
            )}

            {/* Mobile hamburger — opens dedicated Profile Drawer */}
            <button
              type="button"
              className="yhon-hamburger"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Profile Drawer"
            >
              ☰
            </button>
          </div>

        </div>
      </nav>

      {/* Dedicated YHO Club Profile Drawer (Completely separate from main site drawer) */}
      <YHOClubProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
