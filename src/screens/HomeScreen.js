import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { getCharacters, searchCharacters } from "../api/dragonball";
import CharacterCard from "../components/CharacterCard";
import { COLORS } from "../theme/colors";

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchQuery ? handleSearch() : fetchInitialData();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchInitialData = async () => {
    setLoading(true);
    const data = await getCharacters(1, 40);
    setCharacters(data.items || []);
    setLoading(false);
  };

  const handleSearch = async () => {
    const results = await searchCharacters(searchQuery);
    setCharacters(results);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <CharacterCard
            character={item}
            glowColor={index % 2 === 0 ? COLORS.primary : COLORS.secondary}
            onPress={() =>
              navigation.navigate("Detail", { characterId: item.id })
            }
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.sectorText}>Terran Sector 01</Text>
            <Text style={styles.titleText}>
              GLOBAL <Text style={styles.titleItalic}>ROSTER</Text>
            </Text>
            <View style={styles.searchContainer}>
              <MaterialIcons
                name="search"
                size={24}
                color={COLORS.primary}
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="SCAN POWER SIGNATURES..."
                placeholderTextColor={COLORS.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
            </View>
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
  headerContainer: { marginBottom: 30 },
  sectorText: {
    fontFamily: "Jakarta_Bold",
    color: COLORS.primaryContainer,
    fontSize: 10,
    letterSpacing: 2,
  },
  titleText: {
    fontFamily: "SpaceGrotesk_Bold",
    fontSize: 40,
    color: COLORS.text,
  },
  titleItalic: { color: COLORS.primary, fontStyle: "italic" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.glassBackground,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 55,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Jakarta_Bold",
    fontSize: 12,
    color: COLORS.text,
  },
});
