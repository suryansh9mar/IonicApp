import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Button, Divider, Card } from 'react-native-paper';

const EditInvoiceScreen = ({ navigation, route }) => {
  // Assuming invoice data is passed via navigation
  const { invoice } = route.params; 
// const invoice = {
//   id: '1',
//   date: '2024-08-29',
//   companyName:'sexology',
//   companyAddress:'S4B school block  bjhb hvfhvf habdhvbdsh hvfhveq hveqfvhqef ',
//   comapnyEmail:"admin@gmail.com",
//   companyPhone:'7687678687',
//   clientName: 'John Doe',
//   clientCompany: 'Doe Enterprises',
//   clientAddress:'igwf ihwefhuvwe hwvh',
//   clientEmail:'client@gmail.com',
//   clientPhone:'768787577',

//   items: [
//     { description: 'Product XYZ', amount: '500.00' },
//     { description: 'Service ABC', amount: '300.00' },
    
//   ],
//   subtotal: '800.00',
//   taxRate: '10.00%',
//   tax: '80.00',
//   other: '0.00',
//   total: '880.00',
//   notes: 'Thank you for your business.',
// }

  // State to handle invoice fields for editing
  const [companyName, setCompanyName] = useState(invoice.companyName);
  const [companyAddress, setCompanyAddress] = useState(invoice.companyAddress);
  const [companyEmail, setCompanyEmail] = useState(invoice.companyEmail);
  const [companyPhone, setCompanyPhone] = useState(invoice.companyPhone);
  const [clientName, setClientName] = useState(invoice.clientName);
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState(invoice.clientCompany);
  const [clientAddress, setClientAddress] = useState(invoice.clientAddress);
  const [clientEmail, setClientEmail] = useState(invoice.clientEmail);
  const [items, setItems] = useState(invoice.items);
  const [notes, setNotes] = useState(invoice.notes);
  const [subtotal, setSubtotal] = useState(parseFloat(invoice.subtotal) || 0);
  const [taxRate, setTaxRate] = useState(parseFloat(invoice.taxRate) || 0);
  const [tax, setTax] = useState(parseFloat(invoice.tax) || 0);
  const [other, setOther] = useState(parseFloat(invoice.other) || 0);
  const [total, setTotal] = useState(parseFloat(invoice.total) || 0);
  //  calculate subtotal
  const calculateSubtotal = () => {
    const newSubtotal = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
    setSubtotal(newSubtotal);
  };

  //  calculate total
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

  const handleSave = () => {
    // Logic to save the edited invoice
    Alert.alert('Save Invoice', 'Invoice saved successfully!');
    navigation.goBack();
    
  };

  const handleAddItem = () => {
    // Add a new empty item
    setItems([...items, { description: '', amount: '' }]);
  };

  return (
    <>
      {/* AppbarHeader  */}
      <Appbar.Header style={{ backgroundColor: '#6200ee' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Invoice" />
        <Appbar.Action icon="content-save" onPress={handleSave} />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            {/*  Company Information */}
            <View style={styles.section}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                style={styles.input}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Enter Company Name"
              />
              <Text style={styles.label}>Company Address</Text>
              <TextInput
                style={styles.input}
                value={companyAddress}
                onChangeText={setCompanyAddress}
                placeholder="Enter Company Address"
                multiline
              />
              <Text style={styles.label}>Company Email</Text>
              <TextInput
                style={styles.input}
                value={companyEmail}
                onChangeText={setCompanyEmail}
                placeholder="Enter Company Email"
                keyboardType="email-address"
              />
               <Text style={styles.label}>Company Phone</Text>
              <TextInput
                style={styles.input}
                value={companyPhone}
                onChangeText={setCompanyPhone}
                placeholder="Enter company phone"
                keyboardType="phone-pad"
              />
            </View>
            <Divider style={styles.divider} />

            {/*  Client Information */}
            <View style={styles.section}>
              <Text style={styles.label}>Client Name</Text>
              <TextInput
                style={styles.input}
                value={clientName}
                onChangeText={setClientName}
                placeholder="Enter Client Name"
              />
              <Text style={styles.label}>Client Company</Text>
              <TextInput
                style={styles.input}
                value={clientCompany}
                onChangeText={setClientCompany}
                placeholder="Enter Client Company"
              />
              <Text style={styles.label}>Client Address</Text>
              <TextInput
                style={styles.input}
                value={clientAddress}
                onChangeText={setClientAddress}
                placeholder="Enter Client Address"
                multiline
              />
              <Text style={styles.label}>Client Email</Text>
              <TextInput
                style={styles.input}
                value={clientEmail}
                onChangeText={setClientEmail}
                placeholder="Enter Client Email"
                keyboardType="email-address"
              />
              <Text style={styles.label}>Client Phone</Text>
              <TextInput
                style={styles.input}
                value={clientPhone}
                onChangeText={setClientPhone}
                placeholder="Enter client phone"
                keyboardType="phone-pad"
              />
            </View>
            <Divider style={styles.divider} />

            {/*  Items Section */}
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
                    value={item.amount.toString()}
                    onChangeText={(text) => {
                      const newItems = [...items];
                      newItems[index].amount = text;
                      setItems(newItems);
                    }}
                    placeholder="Amount"
                    keyboardType="numeric"
                  />
                </View>
              ))}
              <Button icon="plus" mode="text" onPress={handleAddItem}>
                Add Item
              </Button>
            </View>
            <Divider style={styles.divider} />

            {/* Edit Notes Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={styles.input}
                value={notes}
                onChangeText={setNotes}
                placeholder="Enter any notes here"
                multiline
              />
            </View>

            {/* Totals Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Subtotal</Text>
              <TextInput
                style={styles.input}
                value={subtotal.toFixed(2).toString()}
                editable={false} 
              />
              <Text style={styles.label}>Tax Rate (%)</Text>
              <TextInput
                style={styles.input}
                value={taxRate.toString()}
                onChangeText={setTaxRate}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Tax</Text>
              <TextInput
                style={styles.input}
                value={tax.toFixed(2).toString()}
                editable={false} 
              />
              <Text style={styles.label}>Other</Text>
              <TextInput
                style={styles.input}
                value={other.toString()}
                onChangeText={setOther}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Total</Text>
              <TextInput
                style={styles.input}
                value={total.toFixed(2).toString()}
                editable={false} 
              />
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
  divider: {
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default EditInvoiceScreen;
