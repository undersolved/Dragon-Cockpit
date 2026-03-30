import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Add this
import { getPlanets } from "../api/dragonball";
import GlassCard from "../components/GlassCard";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 60) / 2;

export default function PlanetsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    setLoading(true);
    const data = await getPlanets(1, 20);
    setPlanets(data.items || []);
    setLoading(false);
  };

  // Update this function in src/screens/PlanetsScreen.js
  const handlePlanetSelect = (planet) => {
    navigation.navigate("FilteredList", {
      filterType: "planet",
      filterValue: planet.name,
      filterId: planet.id, // CRITICAL: Pass the numeric ID
      themeColor: COLORS.secondary,
    });
  };

  const renderPlanetCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardWrapper}
      onPress={() => handlePlanetSelect(item)}
    >
      <GlassCard style={styles.card} glowColor={COLORS.secondary}>
        {/* Planet Hologram View */}
        <View style={styles.planetImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.planetImage}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["transparent", COLORS.glassBackground]}
            style={styles.imageOverlay}
          />
        </View>

        <View style={styles.cardHeader}>
          <MaterialIcons name="public" size={14} color={COLORS.secondary} />
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: item.isDestroyed ? "#93000a" : "#003354" },
            ]}
          >
            <Text style={styles.statusText}>
              {item.isDestroyed ? "VOID" : "ACTIVE"}
            </Text>
          </View>
        </View>

        <Text style={styles.planetName} numberOfLines={1}>
          {item.name.toUpperCase()}
        </Text>

        <View style={styles.scanButton}>
          <Text style={styles.scanText}>IDENTIFY SIGNATURES</Text>
          <MaterialIcons name="radar" size={12} color={COLORS.secondary} />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderPlanetCard}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.sectorText}>Celestial Map v1.0</Text>
            <Text style={styles.titleText}>
              COSMOS{"\n"}
              <Text style={styles.titleItalic}>DIRECTORY</Text>
            </Text>
            <Text style={styles.subtitleText}>
              Select coordinates to scan for native combatants.
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 100 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  listContent: { paddingHorizontal: 20, paddingTop: 20 },
  header: { marginBottom: 30 },
  sectorText: {
    fontFamily: "Jakarta_Bold",
    color: COLORS.secondary,
    fontSize: 10,
    letterSpacing: 3,
  },
  titleText: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 36,
    color: COLORS.text,
    lineHeight: 40,
  },
  titleItalic: { color: COLORS.secondary, fontStyle: "italic" },
  subtitleText: {
    fontFamily: "Jakarta_Regular",
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 10,
  },
  cardWrapper: { width: COLUMN_WIDTH, margin: 10 },
  card: { height: 200, padding: 12, justifyContent: "space-between" }, // Height increased for image
  planetImageContainer: {
    height: 90,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  planetImage: { width: "80%", height: "80%" },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  statusText: { fontFamily: "Jakarta_Bold", fontSize: 7, color: "#FFF" },
  planetName: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 18,
    color: COLORS.text,
    fontStyle: "italic",
  },
  scanButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  scanText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 8,
    color: COLORS.secondary,
    letterSpacing: 1,
  },
});
