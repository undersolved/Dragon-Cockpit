import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme/colors";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const { width } = Dimensions.get("window");

// Sync with screen constants
const HORIZONTAL_PADDING = 20;
const COLUMN_GAP = 15;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

export const CardShimmer = () => (
  <View style={styles.cardContainer}>
    <View style={styles.headerRow}>
      <View>
        <ShimmerPlaceHolder
          shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
          style={styles.shimmerLabel}
        />
        <ShimmerPlaceHolder
          shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
          style={styles.shimmerTitle}
        />
      </View>
      <ShimmerPlaceHolder
        shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
        style={styles.shimmerBadge}
      />
    </View>
    <ShimmerPlaceHolder
      shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
      style={styles.shimmerImage}
    />
    <ShimmerPlaceHolder
      shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
      style={styles.shimmerButton}
    />
  </View>
);

export const GridShimmer = () => (
  <View style={styles.gridContainer}>
    <ShimmerPlaceHolder
      shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
      style={styles.shimmerGrid}
    />
  </View>
);

export const DetailShimmer = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.background }}>
    <ShimmerPlaceHolder
      shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
      style={styles.detailHero}
    />
    <View style={{ padding: 24 }}>
      <ShimmerPlaceHolder
        shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
        style={{ width: "40%", height: 20, marginBottom: 10, borderRadius: 4 }}
      />
      <ShimmerPlaceHolder
        shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
        style={{ width: "80%", height: 40, marginBottom: 30, borderRadius: 8 }}
      />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <ShimmerPlaceHolder
          shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
          style={styles.detailStat}
        />
        <ShimmerPlaceHolder
          shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
          style={styles.detailStat}
        />
      </View>
      <ShimmerPlaceHolder
        shimmerColors={["#1a1a1a", "#2a2a2a", "#1a1a1a"]}
        style={styles.detailDesc}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.glassBackground,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  shimmerLabel: { width: 80, height: 10, borderRadius: 5, marginBottom: 8 },
  shimmerTitle: { width: 150, height: 25, borderRadius: 5 },
  shimmerBadge: { width: 60, height: 20, borderRadius: 10 },
  shimmerImage: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    marginBottom: 15,
  },
  shimmerButton: { width: "100%", height: 45, borderRadius: 12 },
  gridContainer: { width: CARD_WIDTH, marginBottom: COLUMN_GAP },
  shimmerGrid: { width: "100%", height: 185, borderRadius: 24 },
  detailHero: { width: "100%", height: 400 },
  detailStat: { flex: 1, height: 60, borderRadius: 16 },
  detailDesc: { width: "100%", height: 150, borderRadius: 20 },
});
