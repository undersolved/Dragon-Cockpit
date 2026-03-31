import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getCharacterById } from "../api/dragonball";
import { translateToEnglish } from "../api/translate";
import GlassCard from "../components/GlassCard";
import { DetailShimmer } from "../components/ShimmerLoader";
import { COLORS } from "../theme/colors";

const { height } = Dimensions.get("window");

export default function DetailScreen({ route, navigation }) {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getCharacterById(characterId);
      if (data) {
        setCharacter(data);
        const translated = await translateToEnglish(data.description);
        setDesc(translated);
      }
      setLoading(false);
    })();
  }, [characterId]);

  if (loading) return <DetailShimmer />;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={{ uri: character.image }}
            style={styles.heroImg}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["transparent", COLORS.background]}
            style={styles.grad}
          />
          <SafeAreaView style={styles.backBtnWrap}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <Text style={styles.raceTitle}>{character.race.toUpperCase()}</Text>
          <Text style={styles.name}>{character.name.toUpperCase()}</Text>
          <View style={styles.statsRow}>
            <GlassCard style={styles.stat}>
              <Text style={styles.label}>KI</Text>
              <Text style={styles.val}>{character.ki}</Text>
            </GlassCard>
            <GlassCard style={styles.stat}>
              <Text style={styles.label}>MAX KI</Text>
              <Text style={styles.val}>{character.maxKi}</Text>
            </GlassCard>
          </View>
          <GlassCard style={styles.descBox}>
            <Text style={styles.descTitle}>DOSSIER</Text>
            <Text style={styles.descText}>{desc}</Text>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: {
    height: height * 0.5,
    width: "100%",
    backgroundColor: COLORS.surfaceHigh,
  },
  heroImg: { width: "100%", height: "100%" },
  grad: { ...StyleSheet.absoluteFillObject },
  backBtnWrap: { position: "absolute", left: 20, top: 10 },
  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: COLORS.glassBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { padding: 20, marginTop: -30 },
  raceTitle: {
    fontFamily: "SpaceGrotesk_Bold",
    color: COLORS.primary,
    fontSize: 16,
  },
  name: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 42,
    color: COLORS.text,
    marginBottom: 20,
  },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  stat: { flex: 1, padding: 15 },
  label: { fontSize: 8, color: COLORS.textMuted, fontFamily: "Jakarta_Bold" },
  val: { fontSize: 16, color: COLORS.text, fontFamily: "SpaceGrotesk_Bold" },
  descBox: { padding: 20 },
  descTitle: {
    fontFamily: "Jakarta_Bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  descText: {
    color: "rgba(255,255,255,0.7)",
    lineHeight: 22,
    fontFamily: "Jakarta_Regular",
  },
});
