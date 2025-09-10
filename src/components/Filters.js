import React from "react";
import { View, StyleSheet } from "react-native";
import CustomSwitch from "./CustomSwitch"; // adjust path if needed

export default function Filters({ veg, nonVeg, setVeg, setNonVeg }) {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.row}>
        <CustomSwitch value={veg} onValueChange={setVeg} type="veg" />
      </View>
      <View style={styles.row}>
        <CustomSwitch value={nonVeg} onValueChange={setNonVeg} type="non-veg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
  },
  row: {
    borderWidth: 1,
    borderColor: "#fbf6f6ff",
    borderRadius: 20,
    padding: 4,
    margin: 4,
    alignItems: "center",
    width: 70,
    height: 40,
  },
});
