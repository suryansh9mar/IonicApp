import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


const Form = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyContact, setCompanyContact] = useState('');

  const handleSubmit = () => {
    Alert.alert('Company Information Submitted', `Name: ${companyName}, Email: ${companyEmail}`);
  };

  const handleSkip = () => {
    Alert.alert('Skipped Company Info', 'You have skipped the company information.');
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
          label="Company Contact"
          value={companyContact}
          onChangeText={setCompanyContact}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          left={<TextInput.Icon icon={() => <MaterialIcons name="phone" size={24} />} />}
        />

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
        <Button mode="outlined" rippleColor="#7a412f" onPress={handleSkip} style={styles.skipButton}>
          Skip
        </Button>
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
  },
  skipButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 6,
  },
});

export default Form;
