import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import Form from './app/screens/Form';

import Home from './app/screens/Home';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import InvoiceScreen from './app/screens/InvoiceScreen';


export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar / >
      
     {/* <Login/> */}
     {/* <Signup/> */}
     {/* <Form/> */}
     {/* <Home/> */}
     {/* <InvoiceScreen/> */}
      
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
 container:{
  flex:1,
 }
})

