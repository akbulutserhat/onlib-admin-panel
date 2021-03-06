import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo_v3.png';

const Navigation = ({ hamburgerOpen, closeMenu }) => {
  const authState = useSelector((state) => state.Auth);
  const { role } = authState.currentUser;
  const mobileNavigation = (
    <nav className='mobile-navbar'>
      <ul className='mobile-list'>
        <li>
          <Link onClick={closeMenu} to='/'>
            Dashboard
          </Link>
        </li>
        <li>
          <Link onClick={closeMenu} to='/books'>
            Books
          </Link>
        </li>
        {role == 'admin' && (
          <>
            <li>
              <Link onClick={closeMenu} to='/libraries'>
                Libraries
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} to='/users'>
                Users
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );

  return (
    <>
      <nav className='custom-navbar d-none d-md-flex'>
        <div className='logo-wrapper'>
          <img className='logo' src={Logo}></img>
        </div>
        <ul className='list-wrapper'>
          <NavLink exact={true} to='/'>
            <li>
              <i className='fas fa-tachometer-alt'></i>
              <span>Dashboard</span>
            </li>
          </NavLink>
          <NavLink to='/books'>
            <li>
              <i className='fas fa-book'></i>
              <span>Books</span>
            </li>
          </NavLink>
          {role == 'admin' && (
            <>
              <NavLink exact={true} to='/libraries'>
                <li>
                  <i className='fas fa-hotel'></i>
                  <span>Libraries</span>
                </li>
              </NavLink>
              <NavLink to='/users'>
                <li>
                  <i className='fas fa-users'></i>
                  <span>Users</span>
                </li>
              </NavLink>
            </>
          )}
        </ul>
        <div className='settings-wrapper'>
          <i className='fas fa-cog'></i>
          <Link to='/'>Settings</Link>
        </div>
      </nav>
      {hamburgerOpen && mobileNavigation}
    </>
  );
};

export default Navigation;
