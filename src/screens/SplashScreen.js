import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  // Animation values for the energy bar and the global opacity
  const progress = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Fade in the whole UI slowly
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // 2. Animate the energy bar "Syncing"
    Animated.timing(progress, {
      toValue: width * 0.65, // Match the 65% width from your design
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // 3. Infinite pulsing for the Dragon Ball aura
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleEnter = () => {
    // Navigate to the main tabs and remove splash from history
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Background Cinematic Texture */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
          }}
          style={styles.backgroundImage}
          blurRadius={3}
        />
        <LinearGradient
          colors={["transparent", "rgba(14,14,14,0.8)", COLORS.background]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
        {/* System Initializing Tag */}
        <View style={styles.initHeader}>
          <View style={styles.headerLine} />
          <Text style={styles.initText}>SYSTEM INITIALIZING</Text>
          <View style={styles.headerLine} />
        </View>

        {/* The 4-Star Dragon Ball centerpiece */}
        <View style={styles.dragonBallContainer}>
          <Animated.View
            style={[styles.auraGlow, { transform: [{ scale: pulseAnim }] }]}
          />
          <LinearGradient
            colors={["#FFD2A0", COLORS.primary, COLORS.primaryContainer]}
            style={styles.dragonBall}
          >
            {/* The Internal Stars Grid */}
            <View style={styles.starsGrid}>
              <View style={styles.starRow}>
                <MaterialIcons
                  name="star"
                  size={32}
                  color={COLORS.onPrimaryContainer}
                />
                <MaterialIcons
                  name="star"
                  size={32}
                  color={COLORS.onPrimaryContainer}
                />
              </View>
              <View style={styles.starRow}>
                <MaterialIcons
                  name="star"
                  size={32}
                  color={COLORS.onPrimaryContainer}
                />
                <MaterialIcons
                  name="star"
                  size={32}
                  color={COLORS.onPrimaryContainer}
                />
              </View>
            </View>
            {/* Glass Shine/Refraction Overlay */}
            <View style={styles.glassRefraction} />
          </LinearGradient>
        </View>

        {/* Logo Text Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logoMain}>
            Z-<Text style={{ color: COLORS.primaryContainer }}>COCKPIT</Text>
          </Text>
          <Text style={styles.logoSub}>
            COMBAT KI INTELLIGENCE INTERFACE V4.0.2
          </Text>
          <Text style={styles.logoSub}>
            MADE BY : BHUPENDRA S HAPAWAT
          </Text>
        </View>

        {/* Loading Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <View>
              <Text style={styles.labelSmall}>AURA SYNCING</Text>
              <Text style={styles.labelLarge}>
                8,999
                <Text style={{ fontSize: 12, opacity: 0.5 }}> / 9,001</Text>
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.labelSmall}>EFFICIENCY</Text>
              <Text style={[styles.labelLarge, { color: COLORS.secondary }]}>
                98.4%
              </Text>
            </View>
          </View>

          {/* Animated Energy Bar */}
          <View style={styles.progressBarTrack}>
            <Animated.View
              style={[styles.progressBarFill, { width: progress }]}
            >
              <LinearGradient
                colors={[COLORS.primaryContainer, COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>

          {/* Technical HUD Grid */}
          <View style={styles.hudGrid}>
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>GRAVITY</Text>
              <Text style={styles.hudValue}>100 G</Text>
            </View>
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>KI PULSE</Text>
              <Text style={[styles.hudValue, { color: COLORS.secondary }]}>
                STABLE
              </Text>
            </View>
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>TARGET</Text>
              <Text style={[styles.hudValue, { color: COLORS.tertiary }]}>
                FRIEZA
              </Text>
            </View>
          </View>
        </View>

        {/* Enter Button */}
        <View style={styles.footer}>
          <Animated.View style={{ transform: [{ translateY: pulseAnim }] }}>
            <MaterialIcons
              name="keyboard-double-arrow-down"
              size={24}
              color={COLORS.primaryContainer}
            />
          </Animated.View>
          <TouchableOpacity
            style={styles.enterButton}
            onPress={handleEnter}
            activeOpacity={0.7}
          >
            <Text style={styles.enterButtonText}>ENTER COCKPIT</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backgroundImage: { width: "100%", height: "100%", opacity: 0.35 },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  initHeader: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  headerLine: {
    height: 1,
    width: 40,
    backgroundColor: COLORS.primary,
    opacity: 0.4,
  },
  initText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 10,
    color: COLORS.primary,
    letterSpacing: 4,
    marginHorizontal: 15,
  },
  dragonBallContainer: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  auraGlow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.primaryContainer,
    opacity: 0.08,
  },
  dragonBall: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 3,
    borderTopColor: "rgba(255,255,255,0.5)",
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 15,
    overflow: "hidden",
  },
  starsGrid: { gap: 15 },
  starRow: { flexDirection: "row", gap: 15 },
  glassRefraction: {
    position: "absolute",
    top: -40,
    left: -40,
    width: 180,
    height: 180,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 90,
  },
  logoSection: { alignItems: "center", marginBottom: 50 },
  logoMain: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 54,
    color: COLORS.text,
    fontStyle: "italic",
    letterSpacing: -2,
  },
  logoSub: {
    fontFamily: "Jakarta_Bold",
    fontSize: 9,
    color: COLORS.secondary,
    letterSpacing: 2,
    marginTop: 4,
  },
  progressSection: { width: "100%", marginBottom: 40 },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  labelSmall: {
    fontFamily: "Jakarta_Bold",
    fontSize: 8,
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
  labelLarge: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 24,
    color: COLORS.primary,
  },
  progressBarTrack: {
    height: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", borderRadius: 10 },
  hudGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  hudItem: {
    backgroundColor: COLORS.glassBackground,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    minWidth: "30%",
  },
  hudLabel: {
    fontFamily: "Jakarta_Bold",
    fontSize: 7,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 4,
  },
  hudValue: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 13,
    color: COLORS.text,
  },
  footer: { alignItems: "center", marginTop: 10 },
  enterButton: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 45,
    paddingVertical: 18,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: COLORS.primaryContainer,
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  enterButtonText: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 13,
    color: COLORS.background,
    letterSpacing: 3,
  },
});
