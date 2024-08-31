import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native'; 
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './AuthContext';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setLoading(true); 

    try {
      await register(name, email, password);
      Alert.alert('Success', 'Registered successfully!');
      navigation.navigate('RoleSelection');
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'An error occurred on the server.');
      } else {
        Alert.alert('Network Error', 'Failed to connect to the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Circular Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/UNI.png')}
          style={styles.logo}
        />
      </View>

      {/* Name Input */}
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
        autoCapitalize="none"
      />

      {/* Email Input */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />

     
      

      {isLoading ? (
        <ActivityIndicator animating={true} color="#2d4bd6" size="large" style={styles.loader} />
      ) : (
        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Sign Up
        </Button>
      )}
       <Button onPress={() => navigation.navigate('Login')} style={styles.switchButton}>
        Already have an account? Log In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  logo: {
    width: 200,
    height: 120,
    borderRadius: 50, 
    borderWidth: 0, 
    borderColor: '#2d4bd6', 
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2d4bd6',
  },
});

export default SignupScreen;
