// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading((e) => !e);
    // Placeholder for login/signup functionality
    Alert.alert(isSignUp ? 'Account created!' : 'Logged in!');
    onLoginSuccess(); // Call the function passed as a prop
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
      <Button mode="contained" onPress={handleSubmit}
        style={styles.button}>
        {isLoading ? (
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '600' }}>
              Loading...{'   '}
            </Text>
            <ActivityIndicator color="#fff" size={30} />

          </View>
        ) : (
          isSignUp ? 'Sign Up' : 'Login'
        )}
      </Button>
      <Button onPress={() => setIsSignUp(!isSignUp)} style={styles.switchButton}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
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
  switchButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default LoginScreen;