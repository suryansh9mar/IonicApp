import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const register = async (name, email, password) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }
  
      const data = await response.json();
      const token = data.token;
  
      if (token) {
        await AsyncStorage.setItem('userToken', data.token); 
        setUserToken(data.token);
        console.log('Token saved:', token);
      } else {
        throw new Error('No token received from the server');
      }
    } catch (error) {
      Alert.alert('Registration Error', error.message);
      console.error('Registration Error:', error.message);
      throw error;
    }
  };
  

  const login = async (email, password) => {
    try {
      const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json(); // Read the response body once
  
      if (!response.ok) {
        // If response is not OK, handle the error using the message from the server
        throw new Error(data.message || 'Failed to log in');
      }
  
      console.log('Received Token:', data.token); // Debugging line
  
      // Ensure token is set correctly
      if (data.token) {
        setUserToken(data.token);
        await AsyncStorage.setItem('userToken', data.token); // Store the token without JSON.stringify
      } else {
        throw new Error('No token received from the server');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.error('Login Error:', error.message);
    }
  };
  
  
  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  useEffect(() => {
    const loadToken = async () => {
      let token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
