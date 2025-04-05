import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const screenList = [
    { name: "Dashboard", icon: "📊", desc: "Your health at a glance" },
    { name: "Medications", icon: "💊", desc: "Track your meds and doses" },
    { name: "Doctors", icon: "👨‍⚕️", desc: "Your saved doctors" },
    { name: "Appointments", icon: "📅", desc: "Upcoming checkups" },
    { name: "Reminders", icon: "⏰", desc: "Health alerts" },
    { name: "Reports", icon: "🧾", desc: "View your health summaries" },
  ];
  const animations = useRef(screenList.map(() => new Animated.Value(1))).current;

  const handlePressIn = (index) => {
    Animated.spring(animations[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(animations[index], {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const getCardStyle = (screen) => {
    switch (screen) {
      case "Dashboard":
        return {
          borderLeftColor: "#2F80ED",
          backgroundColor: "#E3F2FD",
        };
      case "Medications":
        return {
          borderLeftColor: "#66BB6A",
          backgroundColor: "#E8F5E9",
        };
      case "Doctors":
        return {
          borderLeftColor: "#FFB74D",
          backgroundColor: "#FFF3E0",
        };
      case "Appointments":
        return {
          borderLeftColor: "#BA68C8",
          backgroundColor: "#F3E5F5",
        };
      case "Reminders":
        return {
          borderLeftColor: "#4DD0E1",
          backgroundColor: "#E0F7FA",
        };
      case "Reports":
        return {
          borderLeftColor: "#EF5350",
          backgroundColor: "#FFEBEE",
        };
      default:
        return {};
    }
  };

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

        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          {/* Profile Icon */}
          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => navigation.navigate("Settings")} // Replace with your actual profile screen
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal visible={menuVisible} animationType="slide" transparent={true}>
        <View style={styles.navbar}>
          <Pressable
            onPress={() => setMenuVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>✖</Text>
          </Pressable>

          {screenList.map(({ name }) => (
            <Text
              key={name}
              style={styles.navItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate(name);
              }}
            >
              {name === "Medications" ? "My Medications" : name}
            </Text>
          ))}
        </View>
      </Modal>

      {/* Square Cards */}
      <ScrollView contentContainerStyle={styles.grid}>
        {screenList.map((screen, index) => {
          const scaleStyle = {
            transform: [{ scale: animations[index] }],
          };
          return (
            <Animated.View
              key={screen.name}
              style={[styles.cardWrapper, scaleStyle]}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate(screen.name)}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                style={[styles.card, getCardStyle(screen.name)]}
              >
                <Text style={styles.icon}>{screen.icon}</Text>
                <Text style={styles.cardTitle}>
                  {screen.name === "Medications"
                    ? "My Medications"
                    : screen.name}
                </Text>
                <Text style={styles.cardDesc}>{screen.desc}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F80ED",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    height: 45,
    borderColor: "#d0d7de",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  profileIconContainer: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: "#E3F2FD",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    fontSize: 20,
    color: "#2F80ED",
  },
  navbar: {
    flex: 1,
    backgroundColor: "#2F80ED",
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
    fontSize: 26,
    color: "#fff",
  },
  navItem: {
    color: "#fff",
    fontSize: 22,
    paddingVertical: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  cardWrapper: {
    width: "45%",
    aspectRatio: 1,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
});

export default HomeScreen;
