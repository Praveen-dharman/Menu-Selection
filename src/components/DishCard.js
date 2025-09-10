// components/DishCard.js
import React, { useState } from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet,} from "react-native";

const getDishImage = (dishName) => {
  try {
    const normalizedName = (dishName || "").toLowerCase().trim();

    const imageMap = {
      "tandoori chicken": require("../assets/tandoori.jpg"),
      "dal makhani": require("../assets/dal_makhani.jpg"),
      "cabbage": require("../assets/cabbage.jpg"),
      "samosa": require("../assets/samosa.jpg"),
      "jalebi": require("../assets/jalebi.jpg"),
      "chicken tikka": require("../assets/chicken_tikka.jpg"),
      "paneer tikka": require("../assets/paneer_tikka.jpg"),
      "chole bhature": require("../assets/dal_makhani.jpg"),
      "butter chicken": require("../assets/butter_chicken.jpg"),
      "aloo gobi": require("../assets/aloo_gobi.jpg"),
      "biryani": require("../assets/briyani.jpg"),
      "gulab jamun": require("../assets/gulab_jamun.jpg"),
      "kheer": require("../assets/kheer.jpg"),
      "naan": require("../assets/naan.jpg"),
      "raita": require("../assets/raita.jpg"),
      "papadum": require("../assets/papadum.jpg"),
    };
    for (const [key, image] of Object.entries(imageMap)) {
      if (normalizedName.includes(key)) return image;
    }
    const fallbackImages = [
      require("../assets/tandoori.jpg"),
      require("../assets/dal_makhani.jpg"),
      require("../assets/cabbage.jpg"),
    ];
    const fallbackIndex = (dishName || "").length % fallbackImages.length;
    return fallbackImages[fallbackIndex];
  } catch (err) {
    console.warn("getDishImage error", err);
    return require("../assets/cabbage.jpg");
  }
};

export default function DishCard({
  dish,
  isSelected,
  onToggle,
  onIngredient,
  onPress,
}) {
  const [expanded, setExpanded] = useState(false);
  
  const description = dish.description || "Delicious dish prepared with authentic ingredients";
  const maxFirstLineChars = 36;
  const maxSecondLineChars = 10;
  
  const getFormattedDescription = () => {
    const words = description.split(' ');
    let firstLine = '';
    let secondLine = '';
    let wordIndex = 0;
    
    // Build first line with boundary check
    while (wordIndex < words.length) {
      const word = words[wordIndex];
      const testLine = firstLine === '' ? word : `${firstLine} ${word}`;
      
      if (testLine.length <= maxFirstLineChars) {
        firstLine = testLine;
        wordIndex++;
      } else {
        break; // Word doesn't fit, move to second line
      }
    }
    
    // Build second line (exactly 10 characters, no boundary check)
    let remainingText = words.slice(wordIndex).join(' ');
    if (remainingText.length > 0) {
      secondLine = remainingText.substring(0, maxSecondLineChars);
    }
    
    return {
      firstLine,
      secondLine,
      hasMoreContent: remainingText.length > maxSecondLineChars || secondLine.length === maxSecondLineChars
    };
  };

  const renderDescription = () => {
    if (expanded) {
      return (
        <Text style={styles.desc}>
          {description}
          <Text 
            style={styles.readMoreText}
            onPress={() => setExpanded(false)}
          >
            {" Read less"}
          </Text>
        </Text>
      );
    }

    const { firstLine, secondLine, hasMoreContent } = getFormattedDescription();
    
    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.desc}>
          {firstLine}
          {secondLine && '\n'}
          {secondLine}
          {hasMoreContent && (
            <Text 
              style={styles.readMoreText}
              onPress={() => setExpanded(true)}
            >
              {"... Read more"}
            </Text>
          )}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.dishInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{dish.name}</Text>
            <View style={[
              styles.square,
              { borderColor: dish.type === "VEG" ? "#52ac48" : "#d82f11ff" }
            ]}>
              <View style={[
                styles.circle,
                { backgroundColor: dish.type === "VEG" ? "#52ac48" : "#d82f11ff" }
              ]} />
            </View>
          </View>

          <View style={styles.descriptionWrapper}>
            {renderDescription()}
          </View>

          <TouchableOpacity
            style={styles.ingredientButton}
            onPress={onIngredient}
          >
            <View style={styles.ingredientRow}>
              <Image source={require("../assets/ingre.png")} style={styles.ingre} />
              <Text style={styles.ingredientText}>Ingredient</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={getDishImage(dish.name)}
            style={styles.dishImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={[styles.actionButton, isSelected && styles.selectedButton]}
            onPress={(e) => {
              e.stopPropagation?.();
              onToggle && onToggle();
            }}
          >
            <Text style={[styles.actionText, isSelected && styles.selectedText]}>
              {isSelected ? "Remove" : "Add +"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffff",
    marginHorizontal: 8,
    marginVertical: 6,
    paddingBottom:20,
    borderBottomColor: '#f1ececff',
    borderBottomWidth:1
  },
  content: {
    flexDirection: "row",
    padding: 12,
    alignItems: "flex-start",
  },
  dishInfo: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
    marginBottom: 6,
  },
  square: {
    height: 18,
    width: 18,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginTop: -6
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 10,
  },
  descriptionWrapper: {
    marginBottom: 10,
    minHeight: 40,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  desc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  readMoreText: {
    color: "#141414ff",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 20,
  },
  ingredientButton: {
    alignSelf: "flex-start",
    marginTop:2,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingre: {
    width: 15,
    height: 15,
    marginRight: 6,
  },
  ingredientText: {
    fontSize: 15,
    color: "#FF8C00",
    fontWeight: "700",
  },
  imageContainer: {
    marginTop:-8,
    position: "relative",
    alignItems: "center",
  },
  dishImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
  },
  actionButton: {
    position: "absolute",
    bottom: -12,
    paddingHorizontal: 19,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#49c14f",
  },
  selectedText: {
    color: "#FF8C00",
    fontWeight: "bold",
  },
});