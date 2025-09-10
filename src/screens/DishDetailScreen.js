import React from "react";
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";

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

export default function DishDetailsModal({ visible, onClose, dish, isSelected, onToggle, onIngredient, }) {
    if (!dish) return null;
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Dish Image */}
                    <Image
                        source={getDishImage(dish.name)}
                        style={styles.dishImage}
                        resizeMode="cover"
                    />


                    <ScrollView style={styles.content}>
                        {/* Title + Remove Button */}
                        <View style={styles.headerRow}>
                            <View style={styles.titleRow}>
                                <Text style={styles.name}>{dish.name}</Text>
                                <View
                                    style={[
                                        styles.square,
                                        { borderColor: dish.type === "VEG" ? "#52ac48" : "#d82f11ff" },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.circle,
                                            { backgroundColor: dish.type === "VEG" ? "#52ac48" : "#d82f11ff" },
                                        ]}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={onToggle}
                            >
                                <Text
                                    style={[
                                        styles.actionText,
                                        isSelected && styles.removeText,
                                    ]}
                                >
                                    {isSelected ? "Remove" : "Add +"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Description */}
                        <Text style={styles.desc}>
                            <Text style={{ fontWeight: "bold" }}>{dish.cuisine || ""} </Text>
                            {dish.description}
                        </Text>

                        {/* Ingredient Button */}
                        <TouchableOpacity
                            style={styles.ingredientButton}
                            onPress={onIngredient}
                        >
                            <View style={styles.ingredientRow}>
                                <Image
                                    source={require("../assets/ingre2.png")}
                                    style={styles.ingre}
                                />
                                <Text style={styles.ingredientText}>Ingredient</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.62)",
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 20,
        maxHeight: "85%",
    },
    dishImage: {
        width: "90%",
        height: 200,
        marginLeft: 20,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 10
    },
    content: {
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
    },
    square: {
        height: 18,
        width: 18,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 10,
    },
    desc: {
        fontSize: 15,
        color: "#444",
        marginBottom: 20,
        lineHeight: 22,
    },
    actionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderColor: "#d6d1d1ff",
        elevation: 2,

    },
    actionText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#49c14f",
    },
    removeText: {
        color: "#FF8C00",
    },
    ingredientButton: {
        marginTop: 10,
    },
    ingredientRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    ingre: {
        width: 20,
        height: 20,
        marginRight: 6,
    },
    ingredientText: {
        fontSize: 15,
        color: "#FF8C00",
        fontWeight: "700",
    },
});