import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 40,
    backgroundColor: "#fff",
    color: "#111",
  },
  row: { flexDirection: "row", alignItems: "center" },
  spaceBetween: { justifyContent: "space-between" },
  header: {
    marginBottom: 24,
    borderBottom: "2px solid #00BFA6",
    paddingBottom: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00BFA6",
  },
  rightInfo: {
    textAlign: "right",
    fontSize: 9,
    color: "#555",
  },
  invoiceLabelBox: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 26,
    color: "#00BFA6",
    fontWeight: "bold",
  },
  balanceDue: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "bold",
  },
  invoiceNumber: { fontSize: 10, marginBottom: 12 },
  billSection: {
    backgroundColor: "#F4F6F8",
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  billTo: { fontSize: 10, fontWeight: "bold", marginBottom: 4 },
  table: { marginTop: 16, width: "100%" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#00BFA6",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
  },
  th: { flex: 1, padding: 8 },
  thPrice: { flex: 0.8 },
  thQty: { flex: 0.5 },
  thAmount: { flex: 1 },
  td: { flex: 1, padding: 8, fontSize: 9 },
  tdPrice: { flex: 0.8 },
  tdQty: { flex: 0.5 },
  tdAmount: { flex: 1 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  totalLabel: {
    padding: 8,
    fontWeight: "bold",
    flex: 2.3,
    textAlign: "right",
    color: "#111",
  },
  totalValue: {
    padding: 8,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
    backgroundColor: "#00BFA6",
    color: "#fff",
    borderRadius: 4,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 10,
    fontWeight: "bold",
    color: "#00BFA6",
    textTransform: "uppercase",
  },
  terms: {
    marginTop: 12,
    fontSize: 9,
    color: "#888",
  },
  signature: {
    marginTop: 40,
    textAlign: "right",
    fontSize: 10,
  },
});

// Component
export default function Invoice({ invoice }) {
  if (!invoice) {
    return (
      <Document>
        <Page>
          <Text>No invoice data</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.row, styles.spaceBetween, styles.header]}>
          <View>
            <Text style={styles.companyName}>Xpress Enterprises</Text>
            <Text>www.xpresscompany.com</Text>
            <Text>Email: support@xpress.com</Text>
            <Text>Phone: +91 9876543210</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text>7, Ademola Odede</Text>
            <Text>Ikeja, Lagos</Text>
            <Text>Nigeria</Text>
          </View>
        </View>

        {/* Invoice Label & Balance Due */}
        <View style={styles.invoiceLabelBox}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.balanceDue}>Balance Due: ₹{invoice.subtotal}</Text>
        </View>

        {/* Invoice Number and Date */}
        <View style={[styles.row, styles.spaceBetween]}>
          <View style={styles.billSection}>
            <Text style={styles.billTo}>Billed To:</Text>
            <Text>{invoice.billTo}</Text>
            <Text>{invoice.billToAddress || ""}</Text>
          </View>
          <View style={styles.billSection}>
            <Text style={styles.billTo}>Invoice Date:</Text>
            <Text>{invoice.invoiceDate}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.th}>Description</Text>
            <Text style={[styles.th, styles.thPrice]}>Price</Text>
            <Text style={[styles.th, styles.thQty]}>Qty</Text>
            <Text style={[styles.th, styles.thAmount]}>Total</Text>
          </View>

          {invoice.items?.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.td}>{item.description}</Text>
              <Text style={[styles.td, styles.tdPrice]}>{item.rate}</Text>
              <Text style={[styles.td, styles.tdQty]}>{item.quantity}</Text>
              <Text style={[styles.td, styles.tdAmount]}>{item.amount}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{invoice.subtotal}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment / Method</Text>
        <View>
          <Text>Bank Name: HDFC Bank</Text>
          <Text>Bank Number: 123456789</Text>
          <Text>UPI: samvedha@hdfc</Text>
        </View>

        {/* Terms & Conditions */}
        <Text style={styles.sectionTitle}>Terms & Conditions</Text>
        <View style={styles.terms}>
          <Text>1. One year support included.</Text>
          <Text>2. Any future changes may incur additional costs.</Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text>_________________________</Text>
          <Text>Authorized Signature</Text>
        </View>
      </Page>
    </Document>
  );
}
