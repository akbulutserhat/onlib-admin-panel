import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo_v3.png';

const Navigation = ({ hamburgerOpen, closeMenu }) => {
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
        <li>
          <Link onClick={closeMenu} to='/users'>
            Users
          </Link>
        </li>
        <li>
          <Link onClick={closeMenu} to='/'>
            Test
          </Link>
        </li>
        <li>
          <Link onClick={closeMenu} to='/'>
            Long Link Text
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <div>
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
          <NavLink exact={true} to='/libraries'>
            <li>
              <i className='fas fa-hotel'></i>
              <span>Libraries</span>
            </li>
          </NavLink>
          <NavLink exact={true} to='/'>
            <li>
              <i className='fas fa-users'></i>
              <span>Users</span>
            </li>
          </NavLink>
          <NavLink exact={true} to='/'>
            <li>
              <i className='fas fa-tachometer-alt'></i>
              <span>Test</span>
            </li>
          </NavLink>
        </ul>
        <div className='settings-wrapper'>
          <i className='fas fa-cog'></i>
          <Link to='/'>Settings</Link>
        </div>
      </nav>
      {hamburgerOpen && mobileNavigation}
    </div>
  );
};

export default Navigation;
