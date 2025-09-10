import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SectionList, Image } from "react-native";
import dishesData from "../data/dishes.json";
import DishCard from "../components/DishCard";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import Filters from "../components/Filters";
import DishDetailsModal from "../screens/DishDetailScreen";



export default function MenuScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("MAIN COURSE");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [expandedCuisines, setExpandedCuisines] = useState({});
  const [selectedDish, setSelectedDish] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const filteredDishes = dishesData.filter((dish) => {
    if (dish.mealType !== selectedTab) return false;
    if (vegFilter && dish.type !== "VEG") return false;
    if (nonVegFilter && dish.type !== "NON_VEG") return false;
    if (searchQuery && !dish.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Group dishes by cuisine
  const groupedDishes = filteredDishes.reduce((acc, dish) => {
    if (!acc[dish.cuisine]) {
      acc[dish.cuisine] = [];
    }
    acc[dish.cuisine].push(dish);
    return acc;
  }, {});

  const formatCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  // Convert to section list data format
  const sectionData = Object.keys(groupedDishes).map((cuisine) => ({
    title: cuisine,
    data: expandedCuisines[cuisine] ? groupedDishes[cuisine] : [],
  }));

  const toggleCuisine = (cuisine) => {
    setExpandedCuisines((prev) => ({
      ...prev,
      [cuisine]: !prev[cuisine],
    }));
  };

  const toggleSelect = (dishId) => {
    if (selectedDishes.includes(dishId)) {
      setSelectedDishes(selectedDishes.filter((id) => id !== dishId));
    } else {
      setSelectedDishes([...selectedDishes, dishId]);
    }
  };

  const getCategoryCount = (category) => {
    return selectedDishes.filter(id => {
      const dish = dishesData.find(d => d.id === id);
      return dish && dish.mealType === category;
    }).length;
  };


  const renderSectionHeader = ({ section: { title } }) => (
    <TouchableOpacity
      style={styles.cuisineSection}
      onPress={() => toggleCuisine(title)}
    >
      <Text style={styles.cuisineTitle}>{title}</Text>
      <Image
        source={
          expandedCuisines[title]
            ? require("../assets/upload.png")
            : require("../assets/down-arrow.png")
        }
        style={styles.img}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <DishCard
      dish={item}
      isSelected={selectedDishes.includes(item.id)}
      onToggle={() => toggleSelect(item.id)}
      onIngredient={() => navigation.navigate("Ingredients", { dishId: item.id })}
      onPress={() => {
        setSelectedDish(item);
        setShowModal(true);
      }}
    />

  );

  return (
    <View style={styles.container}>


      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <CategoryTabs
        selected={selectedTab}
        onChange={setSelectedTab}
        getCategoryCount={getCategoryCount}
      />



      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {formatCategoryName(selectedTab)} Selected ({getCategoryCount(selectedTab)})
        </Text>
        <Filters
          veg={vegFilter}
          nonVeg={nonVegFilter}
          setVeg={setVegFilter}
          setNonVeg={setNonVegFilter}
        />
      </View>
      <SectionList
        sections={sectionData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.bottomBar}>
        <View style={styles.countRow}>

          <Text style={styles.totalText}>Total Dish Selected  {selectedDishes.length}</Text>
          <Image
            source={require('../assets/right-arrow.png')}
            style={styles.arrowImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <DishDetailsModal
        visible={showModal}
        dish={selectedDish}
        isSelected={selectedDish && selectedDishes.includes(selectedDish.id)}
        onToggle={() => toggleSelect(selectedDish.id)}
        onIngredient={() => navigation.navigate("Ingredients", { dishId: selectedDish.id })}
        onClose={() => setShowModal(false)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: "#ffffffff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  time: {
    fontSize: 16,
    color: "#666",
  },
  sectionHeader: {
    marginTop: 5,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  cuisineSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#ffffffff",
  },
  cuisineTitle: {
    marginLeft:10,
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
  },
  img: {
    width: 15,
    height: 15,
    marginRight: 15,
    tintColor: "#242424ff",
  },
  listContent: {
    paddingBottom: 80,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffffff",
    borderTopWidth: 1,
    borderColor: "#f1ede2d3",
    gap: 2,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  countRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#f4f2ecff",
    alignSelf: "stretch",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  arrowImage: {
    width: 20,
    height: 20,
    tintColor: "#333",
  },
  totalText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  arrowImage: {

    width: 15,
    height: 15,
    tintColor: "#242424ff",
  },

  arrowText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#988f8fff",
    paddingLeft: 200,
  },
  continueButton: {
    backgroundColor: "#2a2a2bff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 15,
    marginRight: 20,
    marginLeft: 20
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});