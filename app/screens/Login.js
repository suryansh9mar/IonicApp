import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator ,KeyboardAvoidingView, Platform} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const LoginScreen = ({ navigation,onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading((e) => !e);
    if (email === 'admin@gmail.com' && password === 'password') {  //dummy data
      onLogin(); 
      Alert.alert(isSignUp ? 'Account created!' : 'Logged in!');
    
      navigation.replace('Home'); 
    } else {
      Alert.alert('Invalid credentials', 'Please check your email or password.');
    }
   
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

    <View style={styles.formContainer}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
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