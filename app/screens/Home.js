import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const Home = ({ onLogout }) => {
  // const navigation = useNavigation(); // Use the navigation hook
  const [invoices, setInvoices] = useState([
    { id: '1', title: 'Invoice 1' },
    { id: '2', title: 'Invoice 2' },
    { id: '3', title: 'Invoice 3' },
  
    
    // Add invoices here
  ]);

  const handleInvoice = (invoice) => {
    // Navigate to the invoice screen with the selected invoice
    navigation.navigate('InvoiceScreen', { invoice }); // Pass the invoice data to the edit screen
  };

  const renderInvoiceItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleInvoice(item)} style={styles.invoiceItem}>
      <Text style={styles.invoiceText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleAddInvoice = () => {
    console.log('Navigate to create invoice');
    navigation.navigate('CreateInvoice'); // Navigate to the create invoice screen
  };

  return (
    <View style={styles.container}>
      {/* Header with title and logout button */}
      <Appbar.Header mode='center-aligned' style={styles.header}>
        <Appbar.Content title="Create Your Invoices" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="logout" onPress={onLogout} />
      </Appbar.Header>

      {/* Conditional rendering for empty and non-empty state */}
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
