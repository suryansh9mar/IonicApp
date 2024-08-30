import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet ,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import screens
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import Form from './app/screens/Form';
import Home from './app/screens/Home';
import EditInvoice from './app/screens/EditInvoice';
import InvoiceScreen from './app/screens/InvoiceScreen';
import AddInvoice from './app/screens/AddInvoice';

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(loggedIn==='true' ); // Set authentication state based on stored value
      } catch (error) {
        console.error('Error fetching login status', error);
      } finally {
        setLoading(false); 
      }
    };
    checkLoginStatus();
    console.log(isAuthenticated);
    
  }, [isAuthenticated]);

   
  const handleLogin = async () => {
    setIsAuthenticated(true); 
    await AsyncStorage.setItem('isAuthenticated', 'true'); 
  };
  
   const handleLogout = async () => {
    try {
      setIsAuthenticated(false);
      await AsyncStorage.setItem('isAuthenticated', 'false');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  if (loading) {
    return <Text>Loading ....</Text>; 
  }
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home">
                {(props) => <Home {...props} onLogout={handleLogout} />} 
              </Stack.Screen>
              <Stack.Screen name="EditInvoice" component={EditInvoice} />
              <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
              <Stack.Screen name="AddInvoice" component={AddInvoice} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login">
                {(props) => <Login {...props} onLogin={handleLogin} />} 
              </Stack.Screen>
              
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
