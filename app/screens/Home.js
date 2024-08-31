import React, { useContext, useState ,useEffect} from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext  from './AuthContext.js';

const Home = ({ onLogout, navigation }) => {

  const [invoices, setInvoices] = useState([]);
  
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const savedInvoices = await AsyncStorage.getItem('invoices');
        if (savedInvoices) {
          setInvoices(JSON.parse(savedInvoices));
        }
      } catch (error) {
        console.error('Error loading invoices:', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', loadInvoices);
    return unsubscribe;
  }, [navigation]);
  const handleInvoice = (invoice) => {

    navigation.navigate('InvoiceScreen', { invoice, onDeleteInvoice: handleDeleteInvoice, onUpdateInvoice: handleUpdateInvoice });
  };
  const handleStats = ()=>{
    navigation.navigate('StatsScreen')
  }
  const handleLogout = async() => {
    onLogout();
    await AsyncStorage.removeItem('userToken');
  };



  const handleAddInvoice = () => {
    console.log('Navigate to create invoice');

    navigation.navigate('AddInvoice', { onAddInvoice });
  };
  const handleDeleteInvoice = async(invoiceId) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== invoiceId);
    setInvoices(updatedInvoices);
    await AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };
  const handleUpdateInvoice = async (updatedInvoice) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );
    setInvoices(updatedInvoices);
    await AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };
  const onAddInvoice = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
  };
  const renderInvoiceItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleInvoice(item)} style={styles.invoiceItem}>
      <Text style={styles.invoiceText}>{item.tittle}</Text>
      {item.isPaid?<Text>(amount is paid)</Text>:<Text>(amount is not paid)</Text>}
    </TouchableOpacity>
  );




  return (
    <View style={styles.container}>
      {/* Header with title and logout button */}
      <Appbar.Header mode='center-aligned' style={styles.header}>
        <Appbar.Content title="Create Your Invoices" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="logout"   onPress={handleLogout}mode='contained-tonal' />
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
        color='#fff'
      />
      <FAB
        style={styles.tabButton}
        icon="chart-bar"
        label="Stats"
        onPress={handleStats}
        color='#fff'
        
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
    backgroundColor: '#2d4bd6',
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
    backgroundColor: '#2d4bd6',


  },
  tabButton:{
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#2d4bd6',

  },
});

export default Home;
