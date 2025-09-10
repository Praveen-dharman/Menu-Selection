import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const categories = ["STARTER", "MAIN COURSE", "DESSERT", "SIDES"];

const formatCategoryName = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

export default function CategoryTabs({ selected, onChange, getCategoryCount }) {
   return (
    <View style={styles.container}>
      {categories.map((cat) => {
        const count = getCategoryCount(cat);
        const formattedCat = formatCategoryName(cat);

        return (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, selected === cat && styles.active]}
            onPress={() => onChange(cat)}
          >
            <Text style={[styles.text, selected === cat && styles.activeText]}>
              {formattedCat} {count}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    // padding: 4,
    gap: 8,
    marginTop: 1
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 6,
    position: "relative",
    borderWidth: 1,
    borderColor: '#c8c1c1ff',
    borderRadius: 6,
    backgroundColor: '#ffffffff',
    elevation: 1,
    padding:2,
    boxSizing: 'content-box'
  },
  active: {
    backgroundColor: "#FF8C00",
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2d2b2bff",
  },
  activeText: {
    color: "#fff",
  },

});