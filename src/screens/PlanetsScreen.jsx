import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getPlanets } from "../api/dragonball";
import { GridShimmer } from "../components/ShimmerLoader";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const COLUMN_GAP = 15;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

export default function PlanetsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    setLoading(true);
    try {
      const data = await getPlanets(1, 20);
      setPlanets(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPlanetCard = ({ item }) =>
    loading ? (
      <GridShimmer />
    ) : (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardWrapper}
        onPress={() =>
          navigation.navigate("FilteredList", {
            filterType: "planet",
            filterValue: item.name,
            filterId: item.id,
            themeColor: COLORS.secondary,
          })
        }
      >
        <LinearGradient
          colors={[
            COLORS.secondary + "CC",
            "rgba(255,255,255,0.15)",
            COLORS.secondary + "30",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.outerBorder}
        >
          <View style={styles.innerCard}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="radar" size={14} color={COLORS.secondary} />
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: item.isDestroyed
                      ? "#93000a20"
                      : COLORS.secondary + "20",
                    borderColor: item.isDestroyed
                      ? "#93000a80"
                      : COLORS.secondary + "50",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: item.isDestroyed ? "#ff8a80" : COLORS.secondary },
                  ]}
                >
                  {item.isDestroyed ? "VOID" : "ACTIVE"}
                </Text>
              </View>
            </View>
            <View style={styles.projectionArea}>
              <LinearGradient
                colors={[
                  COLORS.secondary + "25",
                  COLORS.secondary + "05",
                  "transparent",
                ]}
                style={styles.bleedGradient}
              />
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.planetImage}
                  resizeMode="cover"
                />
              </View>
              <View
                style={[
                  styles.nameSection,
                  { borderLeftColor: COLORS.secondary },
                ]}
              >
                <Text style={styles.planetName} numberOfLines={1}>
                  {item.name.toUpperCase()}
                </Text>
                <Text style={styles.coordText}>
                  SECTOR 7-G // ID: {item.id}
                </Text>
              </View>
            </View>
            <View
              style={[styles.scanButton, { borderColor: COLORS.secondary }]}
            >
              <LinearGradient
                colors={[COLORS.secondary + "20", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.buttonContent}>
                <Text style={[styles.scanText, { color: COLORS.secondary }]}>
                  SCAN SECTOR
                </Text>
                <MaterialIcons
                  name="location-searching"
                  size={12}
                  color={COLORS.secondary}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={loading ? [1, 2, 3, 4, 5, 6] : planets}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} // FIX: Centering
        renderItem={renderPlanetCard}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.sectorText}>Celestial Map v18.2.02</Text>
            <Text style={styles.titleText}>
              PLANETS{"\n"}
              <Text style={styles.titleItalic}>DIRECTORY</Text>
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
  columnWrapper: { justifyContent: "space-between", marginBottom: COLUMN_GAP },
  header: { marginBottom: 30 },
  sectorText: {
    fontFamily: "Jakarta_Bold",
    color: COLORS.secondary,
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
  titleItalic: { color: COLORS.secondary, fontStyle: "italic" },
  cardWrapper: { width: CARD_WIDTH },
  outerBorder: { padding: 1.2, borderRadius: 24 },
  innerCard: {
    backgroundColor: "#080808",
    borderRadius: 23,
    padding: 14,
    height: 260,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusText: { fontFamily: "Jakarta_Bold", fontSize: 7, letterSpacing: 1 },
  projectionArea: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  bleedGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "110%",
    borderRadius: 16,
  },
  imageWrapper: {
    width: "100%",
    height: 90,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 10,
    zIndex: 1,
  },
  planetImage: { width: "100%", height: "100%" },
  nameSection: { borderLeftWidth: 3, paddingLeft: 10, marginTop: 5, zIndex: 1 },
  planetName: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 16,
    color: COLORS.text,
    fontStyle: "italic",
  },
  coordText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 7,
    color: COLORS.secondary,
    letterSpacing: 2,
    marginTop: 2,
    opacity: 0.5,
  },
  scanButton: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    overflow: "hidden",
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  scanText: { fontFamily: "SpaceGrotesk_Bold", fontSize: 10, letterSpacing: 2 },
});
