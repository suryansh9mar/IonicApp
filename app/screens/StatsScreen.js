import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatsScreen({ navigation }) {
  const [invoices, setInvoices] = useState([]);
  const [paidInvoices, setPaidInvoices] = useState(0);
  const [unpaidInvoices, setUnpaidInvoices] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0)); // Initialize with zeros for each month

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const savedInvoices = await AsyncStorage.getItem('invoices');
        if (savedInvoices) {
          const parsedInvoices = JSON.parse(savedInvoices);
          setInvoices(parsedInvoices);

          // Calculate paid and unpaid invoices
          const paidCount = parsedInvoices.reduce((acc, item) => item.isPaid ? acc + 1 : acc, 0);
          const unpaidCount = parsedInvoices.length - paidCount;
          setPaidInvoices(paidCount);
          setUnpaidInvoices(unpaidCount);

          // Initialize monthly revenue array with zeros
          const revenueByMonth = Array(12).fill(0);

          // Calculate revenue by month
          parsedInvoices.forEach(invoice => {
            const date = new Date(invoice.currentDate); // Assuming invoice.date is in ISO format or something parseable
            const month = date.getMonth(); 
            revenueByMonth[month] += invoice.total; // Accumulate the total for each month
          });

          setMonthlyRevenue(revenueByMonth);
        }
      } catch (error) {
        console.error('Error loading invoices:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadInvoices);
    return unsubscribe;
  }, [navigation]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <>
      <Appbar.Header mode='center-aligned' style={{ backgroundColor: '#2d4bd6' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Statistics" titleStyle={{
          color: '#FFFFFF',
          fontWeight: 'bold',
        }} />
      </Appbar.Header>
      <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
        <ScrollView style={styles.container} >
          <Text style={styles.header}>Invoice Status</Text>
          <PieChart
            data={[
              {
                name: "Paid Invoices",
                population: paidInvoices,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Unpaid Invoices",
                population: unpaidInvoices,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
            ]}
            width={screenWidth * 1.2}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />

          <Text style={styles.header}>Monthly Revenue</Text>
          <BarChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [{ data: monthlyRevenue }]
            }}
            width={screenWidth * 1.5}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </ScrollView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
});
