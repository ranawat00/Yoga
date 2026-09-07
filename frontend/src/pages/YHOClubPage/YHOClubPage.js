import React, { useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import YHOClubAuth from './YHOClubAuth';
import YHOClubNavbar from './YHOClubNavbar';
import YHOClubHome from './YHOClubHome';
import './YHOClubPage.css';

export default function YHOClubPage() {
  const { user, view, setView } = useApp();

  // If login happens and view somehow got reset, bring it back to yho-club
  useEffect(() => {
    if (user && view !== 'yho-club') {
      // Only redirect back if we are a student
      if (user.role === 'student') {
        setView('yho-club');
      }
    }
  }, [user, view, setView]);

  // If user is not logged in, render the dedicated Student Login & Sign Up page
  if (!user) {
    return <YHOClubAuth />;
  }

  // Once authenticated, render the dedicated YHO Club portal (Navbar + Home page with banner)
  return (
    <div className="yho-club-portal-wrapper">
      <YHOClubNavbar />
      <YHOClubHome />
    </div>
  );
}
