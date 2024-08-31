import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform ,Image} from 'react-native';
import { TextInput, Button, Text,ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './AuthContext';


const LoginScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState('');
  const [name,setName]=useState('');

  const [password, setPassword] = useState('');
  const [isLoading,setLoading]= useState(false);
  

  const { login,loading } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true)
    if (email.trim() === '' || password.trim() === '' ) {
      Alert.alert('Error', 'Please fill out all fields.');
      setLoading(false);
      return;
    }
  
    try {
     
        await login(email, password);
        Alert.alert('Success', 'Logged in successfully!');
        onLogin();
      
    } catch (error) {
      console.error('Error during login/signup:', error);
      if (error.response) {
        console.log('Server Response:', error.response.data); 
        Alert.alert('Error', error.response.data.message || 'An error occurred on the server.');
        setLoading(false);
      } else {
        Alert.alert('Network Error', 'Failed to connect to the server.');
        setLoading(false);
      }
    }finally{
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={100}  
    >
      <View style={styles.formContainer}>
      <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/UNI.png')}
            style={styles.logo}
          />
        </View>
       
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />{isLoading? <ActivityIndicator animating={true} color="#2d4bd6" size="large" />: <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Login
      </Button>}
       
        <Button onPress={() => navigation.navigate('SignUp')} style={styles.switchButton}>
          Don't have an account? Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  formContainer: {
    paddingHorizontal: 20,
    alignItems: 'center', 
  },
  imageContainer: {
    marginBottom: 20, 
    alignItems: 'center',
  },
  logo: {
    width: 200, 
    height: 120, 
    borderRadius: 50, 
    borderWidth: 0, 
    borderColor: '#2d4bd6', 
    backgroundColor: '#f4f4f4', 
  },
  input: {
    width: '100%', 
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2d4bd6',
  },
  switchButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default LoginScreen;
