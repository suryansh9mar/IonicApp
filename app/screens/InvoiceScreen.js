import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, Divider, Card, Title, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


const InvoiceScreen = ({ navigation,route }) => {
  const { invoice:initialInvoice, onDeleteInvoice,onUpdateInvoice } = route.params;
  const [invoice, setInvoice] = useState(initialInvoice);

  useEffect(() => {
    if (route.params?.updatedInvoice) {
      setInvoice(route.params.updatedInvoice);
    }
  }, [route.params?.updatedInvoice]);
  const handleEditInvoice = () => {
   
    navigation.navigate('EditInvoice', { invoice, onSaveEditedInvoice: handleSaveEditedInvoice });
  };
  const handleSaveEditedInvoice = (updatedInvoice) => {
    setInvoice(updatedInvoice); // Update the local state with the updated invoice
    onUpdateInvoice(updatedInvoice); // Call the update function passed from Home
  };

  const handleUploadToCloud = () => {
    // Implement cloud upload functionality
    Alert.alert('Upload to Cloud', 'Invoice uploaded successfully!');
  };

  const handleDeleteInvoice = async () => {
    try {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete this invoice?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
          await onDeleteInvoice(invoice.id); 
          navigation.goBack(); 
        }},
      ]);
    } catch (error) {
      console.error('Error deleting invoice:', error);
      Alert.alert('Error', 'Failed to delete invoice');
    }
  };
  const generateInvoiceHTML = () => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .invoice-container {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header, .footer {
              text-align: center;
              background-color: #6200ee;
              color: white;
              padding: 10px 0 ;
              margin:0 0 20px;
              
            }
            .header h1, .footer p {
              margin: 0;
            }
            .company-details, .client-details {
              margin-bottom: 30px;
            }
            .company-details h2, .client-details h2 {
              background-color: #6200ee;
              color: white;
              padding: 5px;
              border-radius: 5px;
              margin: 0 0 10px;
            }
            .details-table {
              width: 100%;
              margin-bottom: 20px;
              border-collapse: collapse;
            }
            .details-table th, .details-table td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            .details-table th {
              background-color: #f0f0f0;
            }
            .total-section {
              text-align: right;
              margin-top: 20px;
            }
            .total-section p {
              margin: 5px 0;
            }
            .total-section .total {
              font-size: 18px;
              font-weight: bold;
            }
            .notes {
              margin-top: 20px;
              padding: 10px;
              background-color: #f9f9f9;
              border-left: 5px solid #6200ee;
            }
            .notes h3 {
              margin-top: 0;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <h1>Invoice</h1>
            </div>
  
            <div class="company-details">
              <h2>Company Information</h2>
              <p><strong>${invoice.companyName}</strong></p>
              <p>${invoice.companyAddress}</p>
              <p>Email: ${invoice.companyEmail}</p>
              <p>Phone: ${invoice.companyPhone}</p>
            </div>
  
            <div class="client-details">
              <h2>Client Information</h2>
              <p><strong>${invoice.clientName}</strong></p>
              <p>${invoice.clientCompany}</p>
              <p>${invoice.clientAddress}</p>
              <p>Email: ${invoice.clientEmail}</p>
              <p>Phone: ${invoice.clientPhone}</p>
            </div>
  
            <h2>Invoice Details</h2>
            <p><strong>Date:</strong> ${invoice.date}</p>
            <p><strong>Invoice #:</strong> ${invoice.id}</p>
  
            <h2>Items</h2>
            <table class="details-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td style="text-align: right;">${item.amount}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
  
            <div class="total-section">
              <p><strong>Subtotal:</strong> ${invoice.subtotal}</p>
              <p><strong>Tax Rate:</strong> ${invoice.taxRate}</p>
              <p><strong>Tax:</strong> ${invoice.tax}</p>
              <p><strong>Other:</strong> ${invoice.other}</p>
              <p class="total"><strong>Total:</strong> ${invoice.total}</p>
            </div>
  
            <div class="notes">
              <h3>Notes</h3>
              <p>${invoice.notes}</p>
              <h3>Paid Status</h3>
              <h4>${invoice.isPaid}</h4>
            </div>
  
            <div class="footer">
              <p>Thank you for your business!</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  const handleDownloadInvoice = async () => {
    try {
      const htmlContent = generateInvoiceHTML();
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Failed to download invoice:', error);
      Alert.alert('Error', 'Failed to download invoice');
    }
  };

  

  return (
    <>
      {/* Appbar/Header with buttons */}
      <Appbar.Header style={{ backgroundColor: '#2d4bd6' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={invoice.tittle} titleStyle={styles.headerTitle} />
        <IconButton icon="pencil" onPress={handleEditInvoice}  mode='contained-tonal'/>
        <IconButton icon="cloud-upload" onPress={handleUploadToCloud}  mode='contained-tonal'/>
        <IconButton icon="delete" onPress={handleDeleteInvoice}  mode='contained-tonal'/>
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
                
                <Text style={{maxWidth:100}}>{invoice.companyEmail}</Text>
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
              <Text style={styles.notesTitle}>Paid Status</Text>
             {invoice.isPaid? <Text style={styles.notesContent}>PAID</Text>: <Text style={styles.notesContent}>NOT PAID</Text>}


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
        style={[styles.downloadButton, { backgroundColor: '#2d4bd6' }]}
        labelStyle={styles.downloadButtonLabel}
        onPress={handleDownloadInvoice} 
      >
        Download Invoice
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
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
    alignSelf: 'center', 
  },
  downloadButtonLabel: {
    color: '#fff',
  },
});

export default InvoiceScreen;
