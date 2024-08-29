// SignupScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SignupScreen = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Placeholder for signup functionality
    Alert.alert('Account created!', `Welcome, ${email}!`);
    onSignupSuccess(); // Call the function passed as a prop
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default SignupScreen;