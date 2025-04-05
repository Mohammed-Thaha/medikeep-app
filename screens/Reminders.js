import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";

const reminders = [
  {
    id: "1",
    icon: "💊",
    title: "Take Morning Pills",
    time: "08:00 AM",
    note: "Before breakfast",
  },
  {
    id: "2",
    icon: "💉",
    title: "Insulin Shot",
    time: "01:00 PM",
    note: "After lunch",
  },
  {
    id: "3",
    icon: "💧",
    title: "Drink Water",
    time: "Every 2 hrs",
    note: "Stay hydrated",
  },
];

const Reminders = () => {
  const renderReminder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>
        <Text style={styles.cardNote}>{item.note}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F9FF" />
      <Text style={styles.header}>⏰ Reminders</Text>

      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>➕ Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F80ED",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  icon: {
    fontSize: 34,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  cardTime: {
    fontSize: 14,
    color: "#2F80ED",
    marginBottom: 3,
  },
  cardNote: {
    fontSize: 13,
    color: "#888",
  },
  addButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Reminders;
