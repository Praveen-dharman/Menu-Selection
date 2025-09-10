import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import dishesData from "../data/dishes.json";
import ingredientsData from "../data/ingredients.json";

export default function IngredientScreen({ route, navigation }) {
  const { dishId } = route.params;
  const dish = dishesData.find((d) => d.id === dishId);
  const ingredients = ingredientsData[dishId] || [];

  return (
    <ScrollView style={styles.container}>
      {/* Back and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("../assets/left-arrow.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ingredient list</Text>
      </View>

      {/* Dish Name and Image */}
      <View style={styles.topSection}>
        <View style={styles.textSection}>
          <Text style={styles.dishTitle}>{dish.name}</Text>
          <Text style={styles.dishDesc} >{dish.description}</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image
          source={require("../assets/ingredient.png")}
          style={styles.dishImage}
          resizeMode="cover"
        />
        </View>
        
      </View>

      {/* Ingredients Header */}
      <View style={styles.ingredientsHeader}>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <Text style={styles.ingredientsSubTitle}>For 2 people</Text>
      </View>

      {/* Ingredients List */}
      <View style={styles.ingredientsList}>
        {ingredients.map((item, index) => (
          <View key={index} style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientQty}>{item.quantity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 10,
    gap:10,
    paddingBottom:15,
    borderBottomWidth:2,
    borderColor: '#f6f4f4ff'
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: "#000",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
  
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textSection: {
    flex: 1,
    marginTop:20,
    marginRight:-8
  },
  dishTitle: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 6,
    marginTop:14
  },
  dishDesc: {
    fontSize: 12,
    color: "#4b4a4aff",
    fontWeight:'500',
    lineHeight: 18,
  },
  imgContainer: {
    paddingLeft:16,
    paddingBottom: 4,
    marginTop:12,
    marginRight:-24,
    borderWidth: 1,
    borderColor: "#000",
  },
  dishImage: {
    width: 200,
    height: 230,
    marginRight:-10
   
  },
  ingredientsHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 6,
    marginBottom: 10,
    marginTop:-40
  },
  ingredientsTitle: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 2,
  },
  ingredientsSubTitle: {
    paddingTop: 4,
    fontSize: 14,
    paddingBottom: 10,
    color: "#444",
  },
  ingredientsList: {
    marginTop: 5,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  ingredientName: {
    fontSize: 15,
    color: "#333",
  },
  ingredientQty: {
    fontSize: 15,
    color: "#666",
  },
});
