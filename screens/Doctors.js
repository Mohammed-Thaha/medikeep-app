import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: "1",
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      hospital: "Apollo Hospital",
      experience: "12 years",
      bio: "Expert in heart-related diseases with a track record of successful surgeries and research work.",
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      specialty: "Neurologist",
      hospital: "Fortis Healthcare",
      experience: "10 years",
      bio: "Specialist in neurology with experience in treating rare neurological disorders.",
    },
    {
      id: "3",
      name: "Dr. Emily White",
      specialty: "Dermatologist",
      hospital: "AIIMS",
      experience: "8 years",
      bio: "Specializes in treating skin conditions with compassionate care and modern techniques.",
    },
    {
      id: "4",
      name: "Dr. Alex Brown",
      specialty: "Orthopedic",
      hospital: "Max Hospital",
      experience: "15 years",
      bio: "Focuses on joint replacements, sports injuries, and musculoskeletal disorders.",
    },
    {
      id: "5",
      name: "Dr. Sarah Johnson",
      specialty: "Pediatrician",
      hospital: "Columbia Asia",
      experience: "9 years",
      bio: "Provides expert care for infants, children, and adolescents with a friendly approach.",
    },
    {
      id: "6",
      name: "Dr. Michael Lee",
      specialty: "ENT Specialist",
      hospital: "Manipal Hospital",
      experience: "11 years",
      bio: "Treats ear, nose, and throat conditions with precision and modern treatment.",
    },
    {
      id: "7",
      name: "Dr. Rachel Green",
      specialty: "Ophthalmologist",
      hospital: "Shankar Netralaya",
      experience: "13 years",
      bio: "Specialist in cataract surgery and vision correction with detailed consultations.",
    },
    {
      id: "8",
      name: "Dr. David Wilson",
      specialty: "General Physician",
      hospital: "Medanta Hospital",
      experience: "14 years",
      bio: "Trusted physician treating common and chronic illnesses with a focus on prevention.",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4D9DE0" />

      <View style={styles.header}>
        <Text style={styles.title}>🩺 Top Doctors</Text>
        <Text style={styles.subtitle}>Choose the best care for your health.</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search doctors..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#aaa"
      />

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedDoctor(item)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSpecialty}>{item.specialty}</Text>
              <Text style={styles.cardHospital}>{item.hospital}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal Section */}
      <Modal
        visible={selectedDoctor !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedDoctor(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeBtn} onPress={() => setSelectedDoctor(null)}>
              <Text style={styles.closeText}>✖</Text>
            </Pressable>
            {selectedDoctor && (
              <>
                <Text style={styles.modalName}>{selectedDoctor.name}</Text>
                <Text style={styles.modalSpecialty}>{selectedDoctor.specialty}</Text>
                <Text style={styles.modalHospital}>{selectedDoctor.hospital}</Text>
                {selectedDoctor.experience && (
                  <Text style={styles.modalExperience}>Experience: {selectedDoctor.experience}</Text>
                )}
                <Text style={styles.modalBio}>{selectedDoctor.bio}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1B4965",
  },
  subtitle: {
    fontSize: 14,
    color: "#3D5A80",
    marginTop: 5,
  },
  searchBar: {
    height: 45,
    borderColor: "#C9D6DF",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: "#4D9DE0",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#14213D",
    marginBottom: 4,
  },
  cardSpecialty: {
    fontSize: 15,
    color: "#2F3E46",
    marginBottom: 2,
  },
  cardHospital: {
    fontSize: 13,
    color: "#6C757D",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 6,
  },
  closeBtn: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  closeText: {
    fontSize: 22,
    color: "#4D9DE0",
  },
  modalName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B4965",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSpecialty: {
    fontSize: 16,
    color: "#3D5A80",
    marginBottom: 4,
  },
  modalHospital: {
    fontSize: 15,
    color: "#6C757D",
    marginBottom: 10,
  },
  modalExperience: {
    fontSize: 15,
    color: "#4D4D4D",
    marginBottom: 10,
  },
  modalBio: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default Doctors;
