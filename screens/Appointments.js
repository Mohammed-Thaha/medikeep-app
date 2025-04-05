import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const initialAppointments = [
  {
    id: "1",
    doctor: "Dr. Nandhini Raja",
    specialization: "Cardiologist",
    date: "Apr 10, 2025",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "2",
    doctor: "Dr. Ravi Kumar",
    specialization: "Dermatologist",
    date: "Apr 02, 2025",
    time: "2:30 PM",
    status: "completed",
  },
  {
    id: "3",
    doctor: "Dr. Meena Iyer",
    specialization: "Neurologist",
    date: "Mar 28, 2025",
    time: "11:00 AM",
    status: "cancelled",
  },
];

const statusColor = {
  upcoming: "#FFF9C4",
  completed: "#C8E6C9",
  cancelled: "#FFCDD2",
};

export default function AppointmentsCard() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Inputs for new appointment
  const [newDoctor, setNewDoctor] = useState("");
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const updateStatus = (id, newStatus) => {
    const updated = appointments.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setAppointments(updated);
    setModalVisible(false);
  };

  const openModal = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const addAppointment = () => {
    const newId = (appointments.length + 1).toString();
    const newAppointment = {
      id: newId,
      doctor: newDoctor,
      specialization: newSpecialization,
      date: newDate,
      time: newTime,
      status: "upcoming",
    };
    setAppointments([newAppointment, ...appointments]);
    setAddModalVisible(false);
    setNewDoctor("");
    setNewSpecialization("");
    setNewDate("");
    setNewTime("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Appointments</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.btnText}>➕ Add Appointment</Text>
      </TouchableOpacity>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: statusColor[item.status] || "#fff" },
            ]}
          >
            <View style={styles.header}>
              <MaterialIcons
                name="medical-services"
                size={24}
                color="#1976D2"
              />
              <Text style={styles.doctorName}>{item.doctor}</Text>
            </View>
            <Text style={styles.specialization}>{item.specialization}</Text>
            <View style={styles.detailsRow}>
              <MaterialIcons name="calendar-today" size={18} color="#333" />
              <Text style={styles.detailText}>{item.date}</Text>
              <MaterialIcons
                name="access-time"
                size={18}
                color="#333"
                style={{ marginLeft: 12 }}
              />
              <Text style={styles.detailText}>{item.time}</Text>
            </View>
            <View style={styles.statusBox}>
              <Text style={styles.statusText}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={() => openModal(item.id)}
            >
              <Text style={styles.btnText}>Update Status</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Update Status Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Update Appointment Status</Text>
            <Pressable
              style={[styles.modalBtn, { backgroundColor: "#66BB6A" }]}
              onPress={() => updateStatus(selectedId, "completed")}
            >
              <Text style={styles.modalBtnText}>Mark as Completed</Text>
            </Pressable>
            <Pressable
              style={[styles.modalBtn, { backgroundColor: "#EF5350" }]}
              onPress={() => updateStatus(selectedId, "cancelled")}
            >
              <Text style={styles.modalBtnText}>Cancel Appointment</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelModal}
            >
              <Text style={{ color: "#555" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Add Appointment Modal */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>New Appointment</Text>
            <TextInput
              placeholder="Doctor Name"
              style={styles.input}
              value={newDoctor}
              onChangeText={setNewDoctor}
            />
            <TextInput
              placeholder="Specialization"
              style={styles.input}
              value={newSpecialization}
              onChangeText={setNewSpecialization}
            />
            <TextInput
              placeholder="Date (e.g., Apr 15, 2025)"
              style={styles.input}
              value={newDate}
              onChangeText={setNewDate}
            />
            <TextInput
              placeholder="Time (e.g., 3:30 PM)"
              style={styles.input}
              value={newTime}
              onChangeText={setNewTime}
            />
            <Pressable
              style={[styles.modalBtn, { backgroundColor: "#1976D2" }]}
              onPress={addAppointment}
            >
              <Text style={styles.modalBtnText}>Add Appointment</Text>
            </Pressable>
            <Pressable
              onPress={() => setAddModalVisible(false)}
              style={styles.cancelModal}
            >
              <Text style={{ color: "#555" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F7FC",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2D9CDB",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: "#333",
  },
  specialization: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 4,
  },
  statusBox: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  updateBtn: {
    backgroundColor: "#1976D2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelModal: {
    marginTop: 12,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
