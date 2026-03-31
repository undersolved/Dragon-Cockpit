import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme/colors";

export default function CharacterCard({
  character,
  onPress,
  glowColor = COLORS.primary,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.touchable}
    >
      {/* Edge wala border (The Card Outer Border) */}
      <LinearGradient
        colors={[glowColor + "CC", "rgba(255,255,255,0.15)", glowColor + "30"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.outerBorderWrapper}
      >
        <View style={styles.innerCard}>
          {/* added header up */}
          <View style={styles.header}>
            <View style={[styles.nameSection, { borderLeftColor: glowColor }]}>
              <Text style={[styles.classText, { color: glowColor }]}>
                CLASS: S-TIER
              </Text>
              <Text style={styles.name} numberOfLines={1}>
                {character.name.toUpperCase()}
              </Text>
            </View>

            <View
              style={[
                styles.raceBadge,
                {
                  backgroundColor: glowColor + "10",
                  borderColor: glowColor + "40",
                },
              ]}
            >
              <Text style={[styles.raceText, { color: glowColor }]}>
                {character.race.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* holograph effect mobbin) */}
          <LinearGradient
            colors={[
              glowColor + "40",
              "rgba(255,255,255,0.1)",
              glowColor + "15",
            ]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.imageBorderWrapper}
          >
            <View style={styles.imageInnerContainer}>
              <Image
                source={{ uri: character.image }}
                style={styles.image}
                resizeMode="contain"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.4)", "#080808"]}
                style={styles.imageOverlay}
              />
            </View>
          </LinearGradient>

          {/* see details */}
          <View style={[styles.button, { borderColor: glowColor }]}>
            <LinearGradient
              colors={[glowColor + "20", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={[styles.buttonText, { color: glowColor }]}>
              VIEW DETAILS
            </Text>
            <MaterialIcons name="analytics" size={16} color={glowColor} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  outerBorderWrapper: {
    padding: 1.2,
    borderRadius: 24,
  },
  innerCard: {
    backgroundColor: "#080808",
    borderRadius: 23,
    padding: 18,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 4,
  },
  nameSection: {
    flex: 1,
    paddingLeft: 14,
    borderLeftWidth: 3,
    marginRight: 10,
    justifyContent: "center",
  },
  classText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 9,
    letterSpacing: 3,
    marginBottom: -2,
    opacity: 0.8,
  },
  name: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 28,
    color: COLORS.text,
    fontStyle: "italic",
    lineHeight: 34,
  },
  raceBadge: {
    height: 24,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  raceText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 8,
    letterSpacing: 1,
  },

  // issue fix from gemini : FIX: Lighter gradient border for the image area
  imageBorderWrapper: {
    width: "94%",
    aspectRatio: 1.25,
    padding: 1, // The thickness of the inner image border
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 14,
  },
  imageInnerContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.01)",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "82%",
    height: "82%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
  },

  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    marginTop: 6,
    overflow: "hidden",
    gap: 12,
  },
  buttonText: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 12,
    letterSpacing: 4,
  },
});
