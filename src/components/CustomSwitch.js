import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomSwitch({ value, onValueChange, type }) {
  const activeColor = type === "veg" ? "#52ac48ff" : "#d82f11ff";

  return (
    <TouchableOpacity
      style={[
        styles.track,
        { backgroundColor: value ? "#f9f5f5ff" : "#f9f5f5ff" } 
      ]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.knob,
          { borderColor: activeColor },
          value ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }
        ]}
      >
        <View style={[styles.dot, { backgroundColor: activeColor }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    marginTop:10,
    width: 40,
    height: 10,
    borderRadius: 20,
    justifyContent: "center",
    padding: 4,
  },
  knob: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 6, // rounded square
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
