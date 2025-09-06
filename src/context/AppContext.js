
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  restaurants: [],
  cart: [],
  currentUser: null,
  searchQuery: '',
  loading: false,
  error: null,
  orders: []
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return { ...state, restaurants: action.payload };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.id === action.payload.id && item.restaurantId === action.payload.restaurantId
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id && item.restaurantId === action.payload.restaurantId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.id === action.payload.id && item.restaurantId === action.payload.restaurantId)
        )
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.restaurantId === action.payload.restaurantId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: []
      };
    
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppContextProvider');
  }
  return context;
};

export { AppContext };
