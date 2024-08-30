import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Divider, Card, Title, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const InvoiceScreen = ({ navigation,route }) => {
  const { invoice, onDeleteInvoice } = route.params;
// const invoice = {
//     id: '1',
//     date: '2024-08-29',
//     companyName:'sexology',
//     companyAddress:'S4B school block  bjhb hvfhvf habdhvbdsh hvfhveq hveqfvhqef ',
//     comapnyEmail:"admin@gmail.com",
//     companyPhone:'7687678687',
//     clientName: 'John Doe',
//     clientCompany: 'Doe Enterprises',
//     clientAddress:'igwf ihwefhuvwe hwvh',
//     clientEmail:'client@gmail.com',
//     clientPhone:'768787577',

//     items: [
//       { description: 'Product XYZ', amount: '500.00' },
//       { description: 'Service ABC', amount: '300.00' },
      
//     ],
//     subtotal: '800.00',
//     taxRate: '10.00%',
//     tax: '80.00',
//     other: '0.00',
//     total: '880.00',
//     notes: 'Thank you for your business.',
// }

  // Functions to handle button actions
  const handleEditInvoice = () => {
    // Navigate to form editing screen
    navigation.navigate('EditInvoice', { invoice });
  };

  const handleUploadToCloud = () => {
    // Implement cloud upload functionality
    Alert.alert('Upload to Cloud', 'Invoice uploaded successfully!');
  };

  const handleDeleteInvoice = () => {
    Alert.alert('Delete Invoice', 'Invoice has been deleted.');
    if (onDeleteInvoice) {
      onDeleteInvoice(); 
    }
    navigation.goBack();
  };
  

  return (
    <>
      {/* Appbar/Header with buttons */}
      <Appbar.Header style={{ backgroundColor: '#6200ee' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Invoice" />
        <IconButton icon="pencil" onPress={handleEditInvoice} />
        <IconButton icon="cloud-upload" onPress={handleUploadToCloud} />
        <IconButton icon="delete" onPress={handleDeleteInvoice} />
      </Appbar.Header>

      {/* Invoice Content */}
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{invoice.companyName.toUpperCase()}</Text>
                
                <Text style={{maxWidth:200}} >{invoice.companyAddress}</Text>
                
                <Text>{invoice.companyPhone}</Text>
                <Text>{invoice.comapnyEmail}</Text>
              </View>
              <View style={styles.invoiceInfo}>
                <Title style={styles.invoiceTitle}>INVOICE</Title>
                <Text>Date: {invoice.date}</Text>
                <Text>Invoice #: {invoice.id}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            {/* Billing Information */}
            <View style={styles.billTo}>
              <Text style={styles.billToTitle}>BILL TO:</Text>
              <Text>{invoice.clientName}</Text>
              <Text>{invoice.clientCompany}</Text>
              <Text style={{maxWidth:200}}>{invoice.clientAddress}</Text>
              <Text>{invoice.clientEmail}</Text>
              <Text>{invoice.clientPhone}</Text>
            </View>
            <Divider style={styles.divider} />

            {/* Items Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>DESCRIPTION</Text>
              <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>AMOUNT</Text>
            </View>
            <Divider style={styles.divider} />

            {/* Render each item in the invoice */}
            {invoice.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableRowText, { flex: 2 }]}>{item.description}</Text>
                <Text style={[styles.tableRowText, { flex: 1, textAlign: 'right' }]}>{item.amount}</Text>
              </View>
            ))}
            <Divider style={styles.divider} />

            {/* Notes and Totals */}
            <View style={styles.notes}>
              <Text style={styles.notesTitle}>NOTES</Text>
              <Text style={styles.notesContent}>{invoice.notes}</Text>
            </View>

            {/* Totals Section */}
            <View style={styles.totals}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Subtotal</Text>
                <Text style={styles.totalsValue}>{invoice.subtotal}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Tax Rate</Text>
                <Text style={styles.totalsValue}>{invoice.taxRate}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Tax</Text>
                <Text style={styles.totalsValue}>{invoice.tax}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Other</Text>
                <Text style={styles.totalsValue}>{invoice.other}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsTotalLabel}>TOTAL</Text>
                <Text style={styles.totalsTotalValue}>{invoice.total}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      {/** Download Button */}
      <Button
        icon={() => (
          <MaterialCommunityIcons name="download" size={24} color="#fff" />
        )}
        mode="contained"
        style={[styles.downloadButton, { backgroundColor: '#6200ee' }]}
        labelStyle={styles.downloadButtonLabel}
        onPress={() => Alert.alert('Download', 'Invoice downloaded successfully!')} //download logic pdf convertor
      >
        Download Invoice
      </Button>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyInfo: {},
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  companySlogan: {
    fontSize: 14,
    marginBottom: 10,
  },
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
  },
  billTo: {
    marginBottom: 20,
  },
  billToTitle: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tableRowText: {
    fontSize: 16,
  },
  notes: {
    marginVertical: 20,
  },
  notesTitle: {
    fontWeight: 'bold',
  },
  notesContent: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  totals: {
    marginTop: 20,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalsLabel: {
    fontSize: 16,
  },
  totalsValue: {
    fontSize: 16,
  },
  totalsTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalsTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  downloadButton: {
    marginTop: 10,
    alignSelf: 'center', // Center align the button
  },
  downloadButtonLabel: {
    color: '#fff', // Ensure text color matches button background
  },
});

export default InvoiceScreen;
