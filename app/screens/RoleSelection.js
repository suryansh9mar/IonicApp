import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RoleSelection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <View style={styles.buttonFirst}>

      <Button
        title="Join a Company"
        
        color={'#2d4bd6'}
        onPress={() => navigation.navigate('JoinCompany')}
      />
      </View>
      <Button
        title="Create a Company"
        
        color={'#2d4bd6'}
        onPress={() => navigation.navigate('CreateCompany')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  buttonFirst:{marginBottom:15}
});

export default RoleSelection;