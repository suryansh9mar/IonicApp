import React, { useState,useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';


const Home = ({ onLogout,navigation }) => {
 
  const [invoices, setInvoices] = useState([
    {  id: '1',
      title:'invoice 1',
      date: '2024-08-29',
      companyName:'sexology',
      companyAddress:'S4B school block  bjhb hvfhvf habdhvbdsh hvfhveq hveqfvhqef ',
      comapnyEmail:"admin@gmail.com",
      companyPhone:'7687678687',
      clientName: 'John Doe',
      clientCompany: 'Doe Enterprises',
      clientAddress:'igwf ihwefhuvwe hwvh',
      clientEmail:'client@gmail.com',
      clientPhone:'768787577',
  
      items: [
        { description: 'Product XYZ', amount: '500.00' },
        { description: 'Service ABC', amount: '300.00' },
        
      ],
      subtotal: '800.00',
      taxRate: '10.00%',
      tax: '80.00',
      other: '0.00',
      total: '880.00',
      notes: 'Thank you for your business.', },
    { id: '2', title: 'Invoice 2',date: '2024-08-29',
      companyName:'sexology',
      companyAddress:'S4B school block  bjhb hvfhvf habdhvbdsh hvfhveq hveqfvhqef ',
      comapnyEmail:"admin@gmail.com",
      companyPhone:'7687678687',
      clientName: 'John Doe',
      clientCompany: 'Doe Enterprises',
      clientAddress:'igwf ihwefhuvwe hwvh',
      clientEmail:'client@gmail.com',
      clientPhone:'768787577',
  
      items: [
        { description: 'Product XYZ', amount: '500.00' },
        { description: 'Service ABC', amount: '300.00' },
        
      ],
      subtotal: '800.00',
      taxRate: '10.00%',
      tax: '80.00',
      other: '0.00',
      total: '880.00',
      notes: 'Thank you for your business.', },
    { id: '3', title: 'Invoice 3' },
  
    
    // Add invoices here
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
    });
    return unsubscribe;
  }, [navigation]);
  const handleInvoice = (invoice) => {
    
    navigation.navigate('InvoiceScreen', {invoice,    onDeleteInvoice: () => handleDeleteInvoice(invoice.id)}); 
  };

 

  const handleAddInvoice = () => {
    console.log('Navigate to create invoice');

    navigation.navigate('AddInvoice', { onAddInvoice }); 
  };
  const handleDeleteInvoice = (invoiceId) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
  };
  const onAddInvoice = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
  };
  const renderInvoiceItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleInvoice(item)} style={styles.invoiceItem}>
      <Text style={styles.invoiceText}>{item.title}</Text>
    </TouchableOpacity>
  );
 
  

  
  return (
    <View style={styles.container}>
      {/* Header with title and logout button */}
      <Appbar.Header mode='center-aligned' style={styles.header}>
        <Appbar.Content title="Create Your Invoices" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="logout" onPress={onLogout} />
      </Appbar.Header>

      
      {invoices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved invoices.</Text>
        </View>
      ) : (
        <FlatList
          data={invoices}
          renderItem={renderInvoiceItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button for adding invoices */}
      <FAB
        style={styles.addButton}
        icon="plus"
        label="Add Invoice"
        onPress={handleAddInvoice}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#6200EE',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  invoiceItem: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  invoiceText: {
    fontSize: 18,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 80,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#6200EE',
  },
});

export default Home;
