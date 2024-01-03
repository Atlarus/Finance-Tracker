import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clientInfo: {
    fontSize: 14,
    marginBottom: 10,
  },
  invoiceDetails: {
    fontSize: 14,
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flexGrow: 1,
    padding: 8,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    flexDirection: 'row',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalAmount: {
    fontSize: 16,
  },
});

const InvoiceTemplate = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.companyName}>{formData.companyName}</Text>
        <Text style={styles.clientInfo}>{`Client: ${formData.clientName}`}</Text>
      </View>

      <View style={styles.invoiceDetails}>
        <Text>{`Invoice Date: ${formData.invoiceDate}`}</Text>
        {/* Add more details such as due date, invoice number, etc. */}
      </View>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Unit Price</Text>
          <Text style={styles.tableCell}>Total</Text>
        </View>

        {/* Dynamic item rendering in a table */}
        {formData.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.description || ''}</Text>
            <Text style={styles.tableCell}>{item.quantity || 0}</Text>
            <Text style={styles.tableCell}>${item.unitPrice || 0}</Text>
            <Text style={styles.tableCell}>
              ${(item.quantity || 0) * (item.unitPrice || 0)}
            </Text>
          </View>
        ))}
      </View>

      {/* Total Section */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>$XXX</Text>
        {/* Add tax, discounts, and other total-related details */}
      </View>
    </Page>
  </Document>
);

export default InvoiceTemplate;