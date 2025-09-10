import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      {/* Left Arrow Icon */}
      

      {/* Search Input with Icon */}
      <View style={styles.inputContainer}>
        <Image
        source={require("../assets/left-arrow.png")}
        style={styles.arrowIcon}
      />
        <TextInput
          placeholder="Search dish for your party......"
          value={value}
          onChangeText={onChange}
          style={styles.input}
          placeholderTextColor="#6d6b6bff"
        />
        <Image
          source={require("../assets/search.png")}
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  arrowIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  inputContainer: {
    paddingTop: 8,
    paddingBottom:8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
    tintColor: "#999",
  },
  input: {
    marginLeft:4,
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#2d2b2bff",
  },
});
