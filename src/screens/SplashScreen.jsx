import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  // Animation directly yahan edit
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanlinePos = useRef(new Animated.Value(-100)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const slideHUD = useRef(new Animated.Value(100)).current;

  const [powerLevel, setPowerLevel] = useState(0);

  useEffect(() => {
    // from fading effect
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideHUD, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: width * 0.85,
        duration: 3500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }),
    ]).start();

    // looker
    Animated.loop(
      Animated.timing(scanlinePos, {
        toValue: height + 100,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // jai ho copy paste
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -15,
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();

    // C++ ki yaad aagyi
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 600);
      if (count >= 9001) {
        setPowerLevel(9001);
        clearInterval(interval);
      } else {
        setPowerLevel(count);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* bg */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
          }}
          style={styles.backgroundImage}
          blurRadius={2}
        />
        <LinearGradient
          colors={[
            "rgba(10,10,10,0.85)",
            "rgba(10,10,10,0.5)",
            COLORS.background,
          ]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* scan prog */}
      <Animated.View
        style={[styles.scanline, { transform: [{ translateY: scanlinePos }] }]}
      >
        <LinearGradient
          colors={["transparent", COLORS.primary + "30", "transparent"]}
          style={{ flex: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
        {/* tactical */}
        <View style={styles.initHeader}>
          <View style={[styles.dot, { backgroundColor: COLORS.secondary }]} />
          <Text style={styles.initText}>
            Z-COCKPIT TERMINAL v18.5.0 // ONLINE
          </Text>
          <View style={[styles.dot, { backgroundColor: COLORS.tertiary }]} />
        </View>

        {/* HOLOGRAPHIC CENTERPIECE */}
        <Animated.View
          style={[
            styles.dragonBallContainer,
            { transform: [{ translateY: floatAnim }, { scale: pulseAnim }] },
          ]}
        >
          <View style={styles.auraGlow} />
          <LinearGradient
            colors={["#FFD2A0", COLORS.primary, COLORS.primaryContainer]}
            style={styles.dragonBall}
          >
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
          </LinearGradient>
        </Animated.View>

        {/* LOGO ENGINE */}
        <View style={styles.logoSection}>
          <Text style={styles.logoMain}>
            Z-<Text style={{ color: COLORS.primaryContainer }}>COCKPIT</Text>
          </Text>
          <View style={styles.authorBadge}>
            <Text style={styles.authorText}>DEV: BHUPENDRA S HAPAWAT</Text>
          </View>
        </View>

        {/* HUD ANALYTICS */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <View>
              <Text style={styles.labelSmall}>KI SIGNATURE SCAN</Text>
              <Text style={styles.labelLarge}>
                {powerLevel.toLocaleString()}
                <Text style={{ fontSize: 12, color: COLORS.textMuted }}>
                  {" "}
                  / 9,001
                </Text>
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.labelSmall}>SYNC STATUS</Text>
              <Text style={[styles.labelLarge, { color: COLORS.secondary }]}>
                {powerLevel >= 9001 ? "LOCKED" : "SYNCING..."}
              </Text>
            </View>
          </View>

          {/* Corrected Progress Bar Structure */}
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

          {/* sliders */}
          <Animated.View
            style={[styles.hudGrid, { transform: [{ translateY: slideHUD }] }]}
          >
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>SECTOR</Text>
              <Text style={styles.hudValue}>7-G</Text>
            </View>
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>THREAT</Text>
              <Text style={[styles.hudValue, { color: COLORS.tertiary }]}>
                MAXIMUM
              </Text>
            </View>
            <View style={styles.hudItem}>
              <Text style={styles.hudLabel}>GRAVITY</Text>
              <Text style={styles.hudValue}>450G</Text>
            </View>
          </Animated.View>
        </View>

        {/* pehla logic */}
        <View style={styles.footer}>
          {powerLevel >= 9001 ? (
            <TouchableOpacity style={styles.enterButton} onPress={handleEnter}>
              <Text style={styles.enterButtonText}>INITIALIZE COCKPIT</Text>
              <MaterialIcons
                name="double-arrow"
                size={18}
                color={COLORS.background}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.waitText}>AWAITING SCANNED DATA...</Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backgroundImage: { width: "100%", height: "100%", opacity: 0.2 },
  scanline: { position: "absolute", width: "100%", height: 60, zIndex: 5 },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  initHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  initText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 9,
    color: COLORS.text,
    letterSpacing: 2,
    marginHorizontal: 10,
  },
  dragonBallContainer: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  auraGlow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.primary,
    opacity: 0.12,
  },
  dragonBall: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderTopColor: "rgba(255,255,255,0.4)",
  },
  starsGrid: { gap: 15 },
  starRow: { flexDirection: "row", gap: 15 },
  logoSection: { alignItems: "center", marginBottom: 40 },
  logoMain: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 56,
    color: COLORS.text,
    fontStyle: "italic",
  },
  authorBadge: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.primary + "40",
  },
  authorText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 8,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  progressSection: { width: "100%", marginBottom: 30 },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  labelSmall: {
    fontFamily: "Jakarta_Bold",
    fontSize: 8,
    color: COLORS.textMuted,
    letterSpacing: 2,
  },
  labelLarge: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 28,
    color: COLORS.primary,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%" },
  hudGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  hudItem: {
    backgroundColor: COLORS.glassBackground,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    width: "31%",
  },
  hudLabel: {
    fontFamily: "Jakarta_Bold",
    fontSize: 7,
    color: "rgba(255,255,255,0.3)",
    marginBottom: 2,
  },
  hudValue: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 13,
    color: COLORS.text,
  },
  footer: { height: 80, justifyContent: "center" },
  enterButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  enterButtonText: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 14,
    color: COLORS.background,
    letterSpacing: 2,
  },
  waitText: {
    fontFamily: "Jakarta_Bold",
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 4,
    fontStyle: "italic",
  },
});
