import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const PieChart = ({ percentage }) => {
  const rotateRight = useRef(new Animated.Value(0)).current;
  const rotateLeft = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const right = percentage > 50 ? 180 : (percentage / 50) * 180;
    const left = percentage > 50 ? ((percentage - 50) / 50) * 180 : 0;

    Animated.timing(rotateRight, {
      toValue: right,
      duration: 1000,
      useNativeDriver: true, // Set to true for smoother animation
    }).start();

    Animated.timing(rotateLeft, {
      toValue: left,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [percentage]);

  const spinRight = rotateRight.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const spinLeft = rotateLeft.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={pieStyles.container}>
      <View style={pieStyles.pie}>
        <View style={pieStyles.innerCircle}>
          <Text style={pieStyles.percentageText}>{percentage}%</Text>
        </View>

        {/* Right Half */}
        <Animated.View
          style={[
            pieStyles.halfCircle,
            pieStyles.rightHalf,
            { transform: [{ rotate: spinRight }] },
          ]}
        />

        {/* Left Half */}
        {percentage > 50 && (
          <Animated.View
            style={[
              pieStyles.halfCircle,
              pieStyles.leftHalf,
              { transform: [{ rotate: spinLeft }] },
            ]}
          />
        )}
      </View>
      <Text style={pieStyles.label}>Medication Adherence</Text>
    </View>
  );
};

const pieStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  pie: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  halfCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 15,
    borderColor: "transparent",
    borderLeftColor: "#4CAF50",
    borderBottomColor: "#4CAF50",
  },
  rightHalf: {
    zIndex: 1,
  },
  leftHalf: {
    zIndex: 0,
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
});

export default PieChart;
