import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getCharactersByRace,
  getCharactersByPlanetId,
} from "../api/dragonball"; // Import the ID fetcher
import CharacterCard from "../components/CharacterCard";
import { COLORS } from "../theme/colors";

export default function FilteredListScreen({ route, navigation }) {
  // Destructure filterId from params
  const {
    filterType,
    filterValue,
    filterId,
    themeColor = COLORS.primary,
  } = route.params;

  const insets = useSafeAreaInsets();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilteredData();
  }, [filterValue, filterId]);

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      let data = [];

      if (filterType === "planet") {
        // Use the ID-based fetcher for Cosmos data
        data = await getCharactersByPlanetId(filterId);
      } else {
        // Use the Name-based filter for Genetic data
        data = await getCharactersByRace(filterValue);
      }

      setCharacters(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Scouter Scan Error:", error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={themeColor} />
        <Text style={[styles.loadingText, { color: themeColor }]}>
          SCANNING {filterValue.toUpperCase()} FOR SIGNATURES...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { borderColor: themeColor + "40" }]}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={themeColor} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.subTitle, { color: themeColor }]}>
            {filterType === "planet" ? "COSMOS REGISTRY" : "GENETIC REGISTRY"}
          </Text>
          <Text style={styles.mainTitle}>{filterValue.toUpperCase()}</Text>
        </View>
      </View>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            glowColor={themeColor}
            onPress={() =>
              navigation.navigate("Detail", {
                characterId: item.id,
                glowColor: themeColor,
              })
            }
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="radar" size={60} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>
              NO POWER SIGNATURES DETECTED ON THIS PLANET.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 10,
    marginTop: 20,
    letterSpacing: 2,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 30,
    gap: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.glassBackground,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    fontFamily: "Jakarta_Bold",
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 2,
  },
  mainTitle: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 32,
    color: COLORS.text,
    fontStyle: "italic",
    letterSpacing: -1,
  },
  listContent: { paddingHorizontal: 24 },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    opacity: 0.6,
  },
  emptyText: {
    fontFamily: "Jakarta_Bold",
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 20,
    letterSpacing: 1,
    lineHeight: 18,
    maxWidth: "70%",
  },
});
