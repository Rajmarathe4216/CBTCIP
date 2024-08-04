import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  message: null, // Use one message property for both success and error
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
    case 'REGISTER_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        message: action.payload, // Use message for errors
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    case 'CLEAR_MESSAGE':
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/getuser');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      dispatch({
        type: 'SET_MESSAGE',
        payload: { text: res.data.message, type: 'success' },
      });
      //loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: { text: err.response.data.message, type: 'error' },
      });
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: { text: err.response.data.message, type: 'error' },
      });
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (err) {
      console.error(err);
    }
  
    // Function to delete a cookie by setting its expiration date to a past date
    const deleteCookie = (name) => {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };
  
    // Remove the specific cookie
    deleteCookie('token'); // Replace 'token' with the actual name of your cookie

    dispatch({ type: 'LOGOUT' });
  };

  const clearMessage = () => dispatch({ type: 'CLEAR_MESSAGE' });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        message: state.message, 
        register,
        login,
        logout,
        clearMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
