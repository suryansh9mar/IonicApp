import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

const JoinCompany = ({ navigation, joinedCompany }) => {
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleJoinCompany = async () => {
    const token = await AsyncStorage.getItem('userToken'); 
    console.log(token);
    

    
    if (!token) {
      Alert.alert('Error', 'User token is missing. Please log in again.');
      return; // Exit if the token is missing
    }
    
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth-company/join`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ 
          email: companyEmail.trim(), 
          password: companyPassword 
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Success', 'Joined company successfully!');
        joinedCompany();
      } else {
        Alert.alert('Error', data.error || 'Failed to join the company');
      }
    } catch (error) {
      console.error('Join company error:', error);
      Alert.alert('Error', 'An error occurred while joining the company.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Company</Text>
      <TextInput
        placeholder="Company Email"
        value={companyEmail}
        onChangeText={setCompanyEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Company Password"
        value={companyPassword}
        onChangeText={setCompanyPassword}
        secureTextEntry
        style={styles.input}
      />
      {isLoading ? (
        <ActivityIndicator animating={true} color="#2d4bd6" size="large" style={styles.loader} />
      ) : (
        <Button title="Join" onPress={handleJoinCompany} color={'#2d4bd6'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});

export default JoinCompany;
