import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
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
} from "../api/dragonball";
import CharacterCard from "../components/CharacterCard";
import { CardShimmer } from "../components/ShimmerLoader";
import { COLORS } from "../theme/colors";

export default function FilteredListScreen({ route, navigation }) {
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
        data = await getCharactersByPlanetId(filterId);
      } else {
        data = await getCharactersByRace(filterValue);
      }
      setCharacters(Array.isArray(data) ? data : []);
    } catch (error) {
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

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
        data={loading ? [1, 2, 3] : characters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          loading ? (
            <CardShimmer />
          ) : (
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
          )
        }
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="radar" size={60} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>
                NO POWER SIGNATURES DETECTED.
              </Text>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
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
