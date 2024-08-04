import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const BookingContext = createContext();

const initialState = {
  bookings: [],
  loading: true,
  error: null,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
        loading: false,
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        loading: false,
      };
    case 'BOOKING_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/getbooking');
      dispatch({
        type: 'GET_BOOKINGS',
        payload: res.data.bookings,
      });
    } catch (err) {
      dispatch({
        type: 'BOOKING_ERROR',
        payload: err.response ? err.response.data.msg : err.message,
      });
    }
  };

  const addBooking = async (booking) => {
    try {
      const res = await axios.post('http://localhost:5000/api/bookings/bookevent', booking);
      dispatch({
        type: 'ADD_BOOKING',
        payload: res.data.bookings,
      });
      getBookings();
    } catch (err) {
      dispatch({
        type: 'BOOKING_ERROR',
        payload: err.response ? err.response.data.msg : err.message,
      });
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        loading: state.loading,
        error: state.error,
        getBookings,
        addBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
