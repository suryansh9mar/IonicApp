import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
  }}>
        {/* Define all your screens here */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EditInvoice" component={EditInvoice} />
        <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
        <Stack.Screen name="AddInvoice" component={AddInvoice} />
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
