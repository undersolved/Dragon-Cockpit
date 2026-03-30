import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import GlassCard from "./GlassCard";
import { COLORS } from "../theme/colors";

export default function CharacterCard({
  character,
  onPress,
  glowColor = COLORS.primary,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <GlassCard glowColor={glowColor}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.classText, { color: glowColor }]}>
              CLASS: S-TIER
            </Text>
            <Text style={styles.name}>{character.name.toUpperCase()}</Text>
          </View>
          <View
            style={[
              styles.raceBadge,
              {
                backgroundColor: glowColor + "20",
                borderColor: glowColor + "40",
              },
            ]}
          >
            <Text style={[styles.raceText, { color: glowColor }]}>
              {character.race.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["transparent", COLORS.glassBackground]}
            style={styles.gradient}
          />
        </View>

        <View style={[styles.button, { backgroundColor: glowColor + "20" }]}>
          <Text style={[styles.buttonText, { color: glowColor }]}>
            VIEW DETAILS
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={12} color={glowColor} />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  classText: { fontFamily: "Jakarta_Bold", fontSize: 10, letterSpacing: 2 },
  name: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 26,
    color: COLORS.text,
    fontStyle: "italic",
  },
  raceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  raceText: { fontFamily: "Jakarta_Bold", fontSize: 9 },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.02)",
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "85%", height: "85%" },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
  },
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: { fontFamily: "Jakarta_Bold", fontSize: 11, letterSpacing: 2 },
});
