import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          EventPlanner360
        </Link>
        <ul className="flex space-x-4">
          <li className="nav-item">
            <Link to="/" className="text-white hover:text-blue-200 transition duration-300">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="text-white hover:text-blue-200 transition duration-300">
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="text-white hover:text-blue-200 transition duration-300">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="text-white hover:text-blue-200 transition duration-300">
              Contact Us
            </Link>
          </li>
          {user && user.role === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className="text-white hover:text-blue-200 transition duration-300">
                Admin
              </Link>
            </li>
          )}
          {user && user.role === 'user' && (
            <li className="nav-item">
              <Link to="/profile" className="text-white hover:text-blue-200 transition duration-300">
                Profile
              </Link>
            </li>
          )}
          {user && (
            <div>
              <span>{user.email}</span>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200 transition duration-300">
                  Logout
                </button>
              </li>
            </div>
          )}
          {!user && (
            <li className="nav-item">
              <Link to="/login" className="text-white hover:text-blue-200 transition duration-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
