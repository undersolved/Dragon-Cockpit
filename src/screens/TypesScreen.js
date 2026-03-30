import React from "react";
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
import GlassCard from "../components/GlassCard";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 60) / 2; // Precise calculation for 2 columns with spacing

// All available types for selection
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
    icon: "Waves",
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

  const handleRaceSelect = (race, color) => {
    navigation.navigate("FilteredList", {
      filterValue: race,
      themeColor: color,
    });
  };

  const renderRaceCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardWrapper}
      onPress={() => handleRaceSelect(item.name, item.color)}
    >
      <GlassCard style={styles.card} glowColor={item.color}>
        <View style={styles.cardHeader}>
          <MaterialIcons name={item.icon} size={20} color={item.color} />
          <View
            style={[styles.traitBadge, { backgroundColor: item.color + "20" }]}
          >
            <Text style={[styles.traitText, { color: item.color }]}>
              {item.trait}
            </Text>
          </View>
        </View>

        <Text style={styles.raceName}>{item.name.toUpperCase()}</Text>

        <View style={styles.analyzeButton}>
          <Text style={[styles.analyzeText, { color: item.color }]}>
            ANALYZE
          </Text>
          <MaterialIcons name="analytics" size={12} color={item.color} />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={RACE_DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderRaceCard}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.versionText}>Registry v4.02</Text>
            <Text style={styles.titleText}>
              GENETIC{"\n"}
              <Text style={styles.titleItalic}>CLASSIFICATION</Text>
            </Text>
            <Text style={styles.subtitleText}>
              Select a biological signature to view registered combatants.
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
  listContent: { paddingHorizontal: 20, paddingTop: 20 },
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

  cardWrapper: {
    width: COLUMN_WIDTH,
    margin: 10,
  },
  card: {
    height: 160,
    padding: 16,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  traitBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  traitText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 8,
  },
  raceName: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 18,
    color: COLORS.text,
    fontStyle: "italic",
  },
  analyzeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  analyzeText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 9,
    letterSpacing: 1,
  },
});
