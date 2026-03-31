import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { GridShimmer } from "../components/ShimmerLoader";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const COLUMN_GAP = 15;
// Precise calculation for perfect centering
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

const RACE_DATA = [
  {
    id: "1",
    name: "Saiyan",
    icon: "bolt",
    color: COLORS.primary,
    trait: "ZENKAI",
  },
  {
    id: "2",
    name: "Namekian",
    icon: "eco",
    color: COLORS.secondary,
    trait: "REGEN",
  },
  {
    id: "3",
    name: "Android",
    icon: "memory",
    color: COLORS.tertiary,
    trait: "FLUX",
  },
  {
    id: "4",
    name: "Majin",
    icon: "waves",
    color: COLORS.primaryContainer,
    trait: "CHAOS",
  },
  {
    id: "5",
    name: "Frieza Race",
    icon: "ac-unit",
    color: "#98cbff",
    trait: "EVOLVE",
  },
  { id: "6", name: "Human", icon: "person", color: "#ffdbcd", trait: "SKILL" },
  { id: "7", name: "God", icon: "wb-sunny", color: "#e8c33f", trait: "DIVINE" },
  {
    id: "8",
    name: "Angel",
    icon: "auto-awesome",
    color: "#cfe5ff",
    trait: "UI",
  },
];

export default function TypesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [isSimLoading, setIsSimLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSimLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRaceSelect = (race, color) => {
    navigation.navigate("FilteredList", {
      filterType: "race",
      filterValue: race,
      themeColor: color,
    });
  };

  const renderRaceCard = ({ item }) =>
    isSimLoading ? (
      <GridShimmer />
    ) : (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardWrapper}
        onPress={() => handleRaceSelect(item.name, item.color)}
      >
        <LinearGradient
          colors={[
            item.color + "CC",
            "rgba(255,255,255,0.15)",
            item.color + "30",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.outerBorder}
        >
          <View style={styles.innerCard}>
            <View style={styles.cardHeader}>
              <LinearGradient
                colors={[
                  item.color + "40",
                  "rgba(255,255,255,0.1)",
                  item.color + "15",
                ]}
                style={styles.iconChamber}
              >
                <MaterialIcons name={item.icon} size={18} color={item.color} />
              </LinearGradient>
              <View
                style={[
                  styles.traitBadge,
                  {
                    backgroundColor: item.color + "15",
                    borderColor: item.color + "40",
                  },
                ]}
              >
                <Text style={[styles.traitText, { color: item.color }]}>
                  {item.trait}
                </Text>
              </View>
            </View>

            <View style={[styles.nameSection, { borderLeftColor: item.color }]}>
              <Text style={styles.raceName}>{item.name.toUpperCase()}</Text>
              <Text style={[styles.metaText, { color: item.color }]}>
                SIGNATURE DETECTED
              </Text>
            </View>

            <View style={[styles.analyzeButton, { borderColor: item.color }]}>
              <LinearGradient
                colors={[item.color + "20", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
              <Text style={[styles.analyzeText, { color: item.color }]}>
                ANALYZE
              </Text>
              <MaterialIcons name="analytics" size={12} color={item.color} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={isSimLoading ? [1, 2, 3, 4, 5, 6, 7, 8] : RACE_DATA}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} // FIX: Ensures centering
        renderItem={renderRaceCard}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.versionText}>Registry v18.5.02</Text>
            <Text style={styles.titleText}>
              GENETIC{"\n"}
              <Text style={styles.titleItalic}>CLASSIFICATION</Text>
            </Text>
            <Text style={styles.subtitleText}>
              Select a type of biological signature to view registered combatants.
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 120 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  listContent: { paddingHorizontal: HORIZONTAL_PADDING, paddingTop: 20 },
  columnWrapper: { justifyContent: "space-between", marginBottom: COLUMN_GAP }, // FIX: Centered columns
  header: { marginBottom: 30 },
  versionText: {
    fontFamily: "Jakarta_Bold",
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 3,
    marginBottom: 5,
  },
  titleText: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 36,
    color: COLORS.text,
    lineHeight: 40,
  },
  titleItalic: { color: COLORS.primaryContainer, fontStyle: "italic" },
  subtitleText: {
    fontFamily: "Jakarta_Regular",
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 10,
  },
  cardWrapper: { width: CARD_WIDTH },
  outerBorder: { padding: 1.2, borderRadius: 24 },
  innerCard: {
    backgroundColor: "#080808",
    borderRadius: 23,
    padding: 16,
    height: 185,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconChamber: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  traitBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  traitText: { fontFamily: "Jakarta_Bold", fontSize: 8, letterSpacing: 1 },
  nameSection: { borderLeftWidth: 3, paddingLeft: 10, marginVertical: 10 },
  raceName: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 18,
    color: COLORS.text,
    fontStyle: "italic",
    lineHeight: 22,
  },
  metaText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 7,
    letterSpacing: 1,
    marginTop: 2,
    opacity: 0.7,
  },
  analyzeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    gap: 6,
    overflow: "hidden",
  },
  analyzeText: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 10,
    letterSpacing: 2,
  },
});
