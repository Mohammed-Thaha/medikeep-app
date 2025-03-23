import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const doctors = [
    {
      id: "1",
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      hospital: "Apollo Hospital",
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      specialty: "Neurologist",
      hospital: "Fortis Healthcare",
    },
    {
      id: "3",
      name: "Dr. Emily White",
      specialty: "Dermatologist",
      hospital: "AIIMS",
    },
    {
      id: "4",
      name: "Dr. Alex Brown",
      specialty: "Orthopedic",
      hospital: "Max Hospital",
    },
    {
      id: "5",
      name: "Dr. Sarah Johnson",
      specialty: "Pediatrician",
      hospital: "Columbia Asia",
    },
    {
      id: "6",
      name: "Dr. Michael Lee",
      specialty: "ENT Specialist",
      hospital: "Manipal Hospital",
    },
    {
      id: "7",
      name: "Dr. Rachel Green",
      specialty: "Ophthalmologist",
      hospital: "Shankar Netralaya",
    },
    {
      id: "8",
      name: "Dr. David Wilson",
      specialty: "General Physician",
      hospital: "Medanta Hospital",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#91B4FF" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.menuButton}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search doctors..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Full-Screen Navbar */}
      <Modal visible={menuVisible} animationType="slide" transparent={true}>
        <View style={styles.navbar}>
          <Pressable
            onPress={() => setMenuVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>✖</Text>
          </Pressable>
          <Text style={styles.navItem}>Dashboard</Text>
          <Text style={styles.navItem}>My Medications</Text>
          <Text style={styles.navItem}>Doctors</Text>
          <Text style={styles.navItem}>Appointments</Text>
          <Text style={styles.navItem}>Reminders</Text>
          <Text style={styles.navItem}>Settings</Text>
        </View>
      </Modal>

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSpecialty}>{item.specialty}</Text>
            <Text style={styles.cardHospital}>{item.hospital}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#91B4FF",
  },
  searchBar: {
    flex: 1,
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginLeft: 10,
  },
  navbar: {
    flex: 1,
    backgroundColor: "#91B4FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  closeText: {
    fontSize: 24,
    color: "white",
  },
  navItem: {
    color: "white",
    fontSize: 22,
    paddingVertical: 15,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#91B4FF",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#91B4FF",
    marginBottom: 3,
  },
  cardSpecialty: {
    fontSize: 16,
    color: "#343A40",
  },
  cardHospital: {
    fontSize: 14,
    color: "#6C757D",
  },
});

export default HomeScreen;
