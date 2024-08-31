import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import EditInvoice from './app/screens/EditInvoice';
import InvoiceScreen from './app/screens/InvoiceScreen';
import AddInvoice from './app/screens/AddInvoice';
import StatsScreen from './app/screens/StatsScreen';
import  AuthProvider  from './app/screens/AuthContext'; // Correct import for AuthProvider
import SignupScreen from './app/screens/Signup';
import RoleSelection from './app/screens/RoleSelection';
import JoinCompany from './app/screens/JoinCompany';
import CreateCompany from './app/screens/CreateCompany';

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(loggedIn === 'true'); // Set authentication state based on stored value
      } catch (error) {
        console.error('Error fetching login status', error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home">
                {(props) => <Home {...props} onLogout={handleLogout} />}
              </Stack.Screen>
              <Stack.Screen name="StatsScreen" component={StatsScreen} />
              <Stack.Screen name="EditInvoice" component={EditInvoice} />
              <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
              <Stack.Screen name="AddInvoice" component={AddInvoice} />
            </>
          ) : (
            <>
            
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLogin={handleLogin} />}

            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelection} />
            <Stack.Screen name="JoinCompany"  >
            {(props) => <JoinCompany {...props} joinedCompany={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="CreateCompany"  >
            {(props) => <CreateCompany {...props} createdCompany={handleLogin} />}
            </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
