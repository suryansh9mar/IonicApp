import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Title,ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateCompany = ({createdCompany}) => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [companyPassword,setCompanyPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async() => {
    const token = JSON.parse(await AsyncStorage.getItem('userToken'));
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth-company/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          name: companyName,
          email: companyEmail,
          password: companyPassword,
          address: companyAddress,

        }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Company created successfully!');
         
        createdCompany();

      } else {
        Alert.alert('Error', data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Create company error:', error);
    }finally {
      setIsLoading(false); // Hide loader after request
    }
  };

 

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <Title style={styles.title}>Enter Your Company Info</Title>

        <TextInput
          label="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon={() => <MaterialIcons name="business" size={20} />} />}
        />
        <TextInput
          label="Company Address"
          value={companyAddress}
          onChangeText={setCompanyAddress}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon={() => <MaterialIcons name="location-on" size={24} />} />}
        />
        <TextInput
          label="Company Email"
          value={companyEmail}
          onChangeText={setCompanyEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          left={<TextInput.Icon icon={() => <MaterialIcons name="email" size={24} />} />}
        />
         <TextInput
          label="Company Password"
          value={companyPassword}
          onChangeText={setCompanyPassword}
          style={styles.input}
          mode="outlined"
          keyboardType="visible-password"
          left={<TextInput.Icon icon={() => <MaterialIcons name="lock" size={24} />} />}
        />
        <TextInput
          label="Company Contact"
          value={companyContact}
          onChangeText={setCompanyContact}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          left={<TextInput.Icon icon={() => <MaterialIcons name="phone" size={24} />} />}
        />

{isLoading ? (
          <ActivityIndicator animating={true} color="#2d4bd6" size="large" />
        ) : (
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Submit
          </Button>
        )}
        
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4', // Light background for a cleaner look
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white', // Maintain consistency
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
    backgroundColor:'#2d4bd6',
  },
 
});

export default CreateCompany;
