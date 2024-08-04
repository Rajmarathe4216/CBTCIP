import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const EventContext = createContext();

const initialState = {
  events: [],
  current: null,
  loading: true,
  error: null,
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false,
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
        loading: false,
      };
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
        loading: false,
      };
    case 'EVENT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events/getallevent');
      dispatch({
        type: 'GET_EVENTS',
        payload: res.data.event,
      });
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response.msg,
      });
    }
  };

  const viewEvent=()=>{
    getEvents();
  }

  const addEvent = async (event) => {
    try {
      const res = await axios.post('http://localhost:5000/api/events/addevent', event);
      dispatch({
        type: 'ADD_EVENT',
        payload: res.data,
      });
      getEvents();
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response.msg,
      });
    }
  };

  const deleteEvent = async (event) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/deleteevent/${event._id}`,event);
      dispatch({
        type: 'DELETE_EVENT',
        payload: event,
      });
      getEvents();
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response.msg,
      });
    }
  };

  const updateEvent = async (event) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/events/updateevent/${event._id}`, event);
      dispatch({
        type: 'UPDATE_EVENT',
        payload: res.data,
      });
      getEvents();
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response.msg,
      });
    }
  };

  const setCurrent = (event) => {
    dispatch({ type: 'SET_CURRENT', payload: event });
  };

  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getEvents,
        viewEvent,
        addEvent,
        deleteEvent,
        updateEvent,
        setCurrent,
        clearCurrent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
