import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Button, Divider, Card,  } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddInvoice = ({ navigation, route }) => {
  const { onAddInvoice } = route.params;
  const [tittle, setTittle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [items, setItems] = useState([{ description: '', amount: '' }]);
  const [notes, setNotes] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [tax, setTax] = useState(0);
  const [other, setOther] = useState(0);
  const [total, setTotal] = useState(0);
  const [isPaid, setPaid] = useState(false);
 const currentDate = new Date().toISOString();

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    const newSubtotal = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
    setSubtotal(newSubtotal);
  };

  // Function to calculate total
  const calculateTotal = () => {
    const calculatedTax = (subtotal * parseFloat(taxRate || 0)) / 100;
    setTax(calculatedTax);
    const newTotal = subtotal + calculatedTax + parseFloat(other || 0);
    setTotal(newTotal);
  };

  // Recalculate subtotal and total whenever items, taxRate, or other change
  useEffect(() => {
    calculateSubtotal();
  }, [items]);

  useEffect(() => {
    calculateTotal();
  }, [subtotal, taxRate, other]);

  const handleSave = async () => {
    // Logic to save the new invoice
    const newInvoice = {
      id: Date.now().toString(), // Unique ID
      date: new Date().toLocaleDateString(),
      tittle,
      companyName,
      companyAddress,
      companyEmail,
      companyPhone,
      clientName,
      clientCompany,
      clientAddress,
      clientEmail,
      clientPhone,
      items,
      subtotal,
      taxRate,
      other,
      total,
      notes,
      isPaid,
      currentDate
    };
    if (tittle !== '') {
      try {
        const existingInvoices = await AsyncStorage.getItem('invoices');
        const invoices = existingInvoices ? JSON.parse(existingInvoices) : [];

        // Add the new invoice to the list and save it back to AsyncStorage
        invoices.push(newInvoice);
        await AsyncStorage.setItem('invoices', JSON.stringify(invoices));

        Alert.alert('Success', 'Invoice saved successfully');

        // Trigger the callback passed from Home to update the list
        if (route.params?.onAddInvoice) {
          route.params.onAddInvoice(newInvoice);
        }

        // Navigate back to Home screen
        navigation.goBack();
      } catch (error) {
        console.error('Error saving invoice:', error);
        Alert.alert('Error', 'Failed to save invoice');
      }

    }
    else {
      Alert.alert('Error', 'Failed to save invoice.Pls enter invoice tittle and data');
    }

  };


  const handleAddItem = () => {

    setItems([...items, { description: '', amount: '' }]);
  };

  return (
    <>
      {/* Appbar/Header with buttons */}
      <Appbar.Header style={{ backgroundColor: '#2d4bd6' }} mode='center-aligned'>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Invoice" titleStyle={{ color: '#fff', fontWeight: 'bold' }} />
        <Appbar.Action icon="content-save" onPress={handleSave} mode='contained-tonal' />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.section}>
              <Text style={[styles.label, { paddingLeft: 80 }]}>Invoice Tittle</Text>

              <TextInput
                style={styles.input}
                value={tittle}
                onChangeText={setTittle}
                placeholder="Enter invoice tittle"
              />

            </View>
            {/* Company Info Section */}
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Enter company name"
            />
            <Text style={styles.label}>Company Address</Text>
            <TextInput
              style={styles.input}
              value={companyAddress}
              onChangeText={setCompanyAddress}
              placeholder="Enter company address"
            />
            <View style={styles.section}>



              <Text style={styles.label}>Company Email</Text>
              <TextInput
                style={styles.input}
                value={companyEmail}
                onChangeText={setCompanyEmail}
                placeholder="Enter company email"
              />
              <Text style={styles.label}>Client Phone</Text>
              <TextInput
                style={styles.input}
                value={clientPhone}
                onChangeText={setCompanyPhone}
                keyboardType="numeric"
                placeholder="Enter client phone no."
              />

            </View>

            {/* Client Info Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Client Name</Text>
              <TextInput
                style={styles.input}
                value={clientName}
                onChangeText={setClientName}
                placeholder="Enter client name"
              />
              <Text style={styles.label}>Client Company</Text>
              <TextInput
                style={styles.input}
                value={clientCompany}
                onChangeText={setClientCompany}
                placeholder="Enter client company"
              />
              <Text style={styles.label}>Client Address</Text>
              <TextInput
                style={styles.input}
                value={clientAddress}
                onChangeText={setClientAddress}
                placeholder="Enter client address"
              />
              <Text style={styles.label}>Client Email</Text>
              <TextInput
                style={styles.input}
                value={clientEmail}
                onChangeText={setClientEmail}
                placeholder="Enter client email"
              />
              <Text style={styles.label}>Client Phone</Text>
              <TextInput
                style={styles.input}
                value={clientPhone}
                onChangeText={setClientPhone}
                keyboardType="numeric"
                placeholder="Enter client phone no."
              />
            </View>

            {/* Items Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Items</Text>
              {items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <TextInput
                    style={[styles.input, { flex: 2 }]}
                    value={item.description}
                    onChangeText={(text) => {
                      const newItems = [...items];
                      newItems[index].description = text;
                      setItems(newItems);
                    }}
                    placeholder="Description"
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={item.amount}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const newItems = [...items];
                      newItems[index].amount = text;
                      setItems(newItems);
                    }}
                    placeholder="Amount"
                  />
                </View>
              ))}
              <Button mode="contained" onPress={handleAddItem} style={styles.addButton}>
                Add Item
              </Button>
            </View>

            {/* Notes Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={styles.input}
                value={notes}
                onChangeText={setNotes}
                placeholder="Additional notes"
              />
              <Checkbox style={{margin:8}} value={isPaid} onValueChange={setPaid} />
              <Text >Amount Paid</Text>
              
            </View>

            {/* Totals Section */}
            <View style={styles.section}>
              <View style={styles.totalsRow}>
                <Text style={styles.label}>Subtotal</Text>
                <Text>{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.label}>Tax Rate (%)</Text>
                <TextInput
                  style={styles.input}
                  value={taxRate.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => setTaxRate(parseFloat(text))}
                  placeholder="Tax Rate"
                />
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.label}>Other</Text>
                <TextInput
                  style={styles.input}
                  value={other.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => setOther(parseFloat(text))}
                  placeholder="Other charges"
                />
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.label}>Total</Text>
                <Text>{total.toFixed(2)}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  card: {
    padding: 10,
    borderRadius: 8,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    marginTop: 10,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AddInvoice;
