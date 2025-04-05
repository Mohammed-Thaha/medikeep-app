import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ReportsScreen = () => {
  // Example reports data (you can connect this to your backend or state later)
  const reports = [
    {
      title: "Blood Test Report",
      date: "March 25, 2025",
      summary: "Hemoglobin slightly low. Vitamin D deficiency noted.",
    },
    {
      title: "Annual Health Checkup",
      date: "January 10, 2025",
      summary: "Overall good. Suggested dietary changes for cholesterol.",
    },
    {
      title: "Cardiology Report",
      date: "December 05, 2024",
      summary: "No irregularities detected. Regular monitoring advised.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Health Reports</Text>
      {reports.map((report, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{report.title}</Text>
          <Text style={styles.date}>{report.date}</Text>
          <Text style={styles.summary}>{report.summary}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F9FB",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2F80ED",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#7E57C2",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  summary: {
    fontSize: 14,
    color: "#444",
  },
});

export default ReportsScreen;
