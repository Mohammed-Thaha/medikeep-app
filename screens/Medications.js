import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AnimatedPatientDashboard() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const healthData = [
    { label: "Mon", value: 60 },
    { label: "Tue", value: 80 },
    { label: "Wed", value: 70 },
    { label: "Thu", value: 65 },
    { label: "Fri", value: 90 },
    { label: "Sat", value: 75 },
    { label: "Sun", value: 85 },
  ];

  const chartAnimations = healthData.map(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    chartAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: healthData[index].value,
        duration: 800,
        delay: index * 100,
        useNativeDriver: false,
      }).start();
    });

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Animated.Text
        style={[
          styles.heading,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        👋 Welcome, Thaha
      </Animated.Text>

      <Animated.View style={[styles.card, animatedStyle(fadeAnim, slideAnim)]}>
        <Text style={styles.cardTitle}>Today's Overview</Text>
        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>72 bpm</Text>
            <Text style={styles.statLabel}>Heart Rate</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>120/80</Text>
            <Text style={styles.statLabel}>Blood Pressure</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Medications</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, animatedStyle(fadeAnim, slideAnim)]}>
        <Text style={styles.cardTitle}>Weekly Health Activity</Text>
        <View style={styles.chart}>
          {healthData.map((item, index) => (
            <View key={index} style={styles.chartItem}>
              <Animated.View
                style={[
                  styles.chartBar,
                  {
                    height: chartAnimations[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                    backgroundColor: "#4CAF50",
                  },
                ]}
              />
              <Text style={styles.chartLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* 🌟 Today's Medications Section */}
      <Animated.View style={[styles.card, animatedStyle(fadeAnim, slideAnim)]}>
        <Text style={styles.cardTitle}>Today's Medications</Text>
        {[
          { name: "Paracetamol", dosage: "500mg", time: "8:00 AM", taken: true },
          { name: "Amoxicillin", dosage: "250mg", time: "1:00 PM", taken: false },
          { name: "Vitamin D", dosage: "1000 IU", time: "8:00 PM", taken: false },
        ].map((med, index) => (
          <View key={index} style={styles.medicationItem}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>💊 {med.name}</Text>
              <Text style={styles.medicationDetails}>
                {med.dosage} • {med.time}
              </Text>
            </View>
            <View
              style={[
                styles.medStatus,
                { backgroundColor: med.taken ? "#A5D6A7" : "#FFCDD2" },
              ]}
            >
              <Text style={styles.medStatusText}>
                {med.taken ? "Taken" : "Missed"}
              </Text>
            </View>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

function animatedStyle(opacityVal, translateYVal) {
  return {
    opacity: opacityVal,
    transform: [{ translateY: translateYVal }],
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D9CDB",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    paddingVertical: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976D2",
  },
  statLabel: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  appointmentText: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 150,
    marginTop: 10,
  },
  chartItem: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  chartBar: {
    width: 20,
    borderRadius: 6,
  },
  chartLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },

  // 💊 Medications styles
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  medicationDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  medStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  medStatusText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
});
