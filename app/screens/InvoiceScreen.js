import React from 'react';
import { View, Text, StyleSheet, ScrollView,Alert } from 'react-native';
import { Divider, Card, Title ,Appbar,Button,IconButton} from 'react-native-paper';

const InvoiceScreen = ({ route }) => {
//   const { invoice } = route.params; // Assuming invoice data is passed via navigation
const handleEditInvoice = () => {
    // Navigate to form editing screen
    navigation.navigate('EditInvoiceForm', { invoice });
  };

const handleUploadToCloud = () => {
    // Implement cloud upload functionality
    Alert.alert('Upload to Cloud', 'Invoice uploaded successfully!');
  };

  const handleDeleteInvoice = () => {
    // Implement delete functionality
    Alert.alert('Delete Invoice', 'Invoice has been deleted.');
  }; 

  return (
    <>
    
     {/* Appbar/Header with buttons */}
     <Appbar.Header>
     <Appbar.BackAction onPress={() => navigation.goBack()}  />
     <Appbar.Content title="Invoice" />
     <IconButton icon="pencil" onPress={handleEditInvoice} />
     <IconButton icon="cloud-upload" onPress={handleUploadToCloud} />
     <IconButton icon="delete" onPress={handleDeleteInvoice} />
   </Appbar.Header>
         {/* Invoice Content */}

    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>[Company Name]</Text>
              <Text style={styles.companySlogan}>[Company Slogan]</Text>
              <Text>[ Address]</Text>
             
              <Text>[Phone]</Text>
              <Text>[Email]</Text>
            </View>
            <View style={styles.invoiceInfo}>
              <Title style={styles.invoiceTitle}>INVOICE</Title>
                <Text>[Date] </Text>
              <Text>[Invoice#]</Text>
            </View>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.billTo}>
            <Text style={styles.billToTitle}>BILL TO:</Text>
            <Text>[clientName]</Text>
            <Text>[clientCompany]</Text>
            <Text>[ Address]</Text>
            
            <Text>[Phone]</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>DESCRIPTION</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>AMOUNT</Text>
          </View>
          <Divider style={styles.divider} />

          {/* {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>
                {item.description}
              </Text>
              <Text style={[styles.tableRowText, { flex: 1, textAlign: 'right' }]}>
                {item.amount}
              </Text>
            </View>
          ))} */}
          <Divider style={styles.divider} />

          <View style={styles.notes}>
            <Text style={styles.notesTitle}>NOTES</Text>
            <Text style={styles.notesContent}>[notes]</Text>
          </View>

          <View style={styles.totals}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text style={styles.totalsValue}>[subtotal]</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax Rate</Text>
              <Text style={styles.totalsValue}>[taxRate]</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax</Text>
              <Text style={styles.totalsValue}>[tax]</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Other</Text>
              <Text style={styles.totalsValue}>[other]</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsTotalLabel}>TOTAL</Text>
              <Text style={styles.totalsTotalValue}>[total]</Text>
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
});

export default InvoiceScreen;
