

# 🐉 Z-COCKPIT | Ultimate Dragon Ball Intelligence Interface

**Z-COCKPIT** is a high-performance, tactical mobile application built with **React Native Expo SDK 55**. It serves as a comprehensive intelligence database for the Dragon Ball universe, featuring a cinematic "Scouter" UI, real-time Spanish-to-English translation, and advanced celestial mapping.

Developed with a strict focus on **React Navigation** (bypassing Expo Router) for precise routing control and a **Glassmorphic** design language.

-----

## 🚀 Core Features

  * **Cinematic Splash Engine:** A dynamic entry sequence featuring a 4-star Dragon Ball centerpiece, animated "Aura Syncing" energy bars, and a technical HUD.
  * **Global Roster (Home):** Infinite-scrolling database of all fighters with a "Scouter" search feature to filter power signatures by name.
  * **Genetic Registry (Classification):** A standardized 2-column grid allowing users to analyze combatants by biological race (Saiyan, Namekian, Android, etc.).
  * **Planetary Archives (Cosmos):** A celestial directory to scan the 7th Universe's planets (Vegeta, Namek, Earth) and identify native residents.
  * **Character Dossier (Details):** Deep-dive statistics including Base/Max Ki, origin planets, and evolutionary transformation paths.
  * **Live Translation Engine:** Automatically detects and translates character biographies from Spanish to English using a cached, chunk-based translation service.

-----

## 🛠️ Tech Stack & Dependencies

  * **Framework:** Expo SDK 55
  * **Navigation:** `@react-navigation/native` (Stack & Bottom Tabs)
  * **Styling:** Custom StyleSheet with Glassmorphism principles.
  * **Icons:** `@expo/vector-icons` (MaterialIcons)
  * **Fonts:** Space Grotesk & Plus Jakarta Sans
  * **Visuals:** `expo-linear-gradient`
  * **API:** [Dragon Ball API](https://www.google.com/search?q=https://dragonball-api.com/) & MyMemory Translation API

-----

## 📦 Installation Guide

### 1\. Clone the Repository

```bash
git clone https://github.com/undersolved/DragonBallApp.git
cd DragonBallApp
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Ensure SDK 55 Compatibility

If you are upgrading an existing project, run the Expo fix command to align all peer dependencies:

```bash
npx expo install --fix
```

### 4\. Required Fonts & UI Libraries

```bash
npx expo install \
  @expo-google-fonts/space-grotesk \
  @expo-google-fonts/plus-jakarta-sans \
  expo-font \
  expo-linear-gradient \
  react-native-safe-area-context \
  react-native-screens
```

### 5\. Launch the Cockpit

```bash
npx expo start
```

*Run on iOS Simulator, Android Emulator, or physical devices via Expo Go.*

-----

## 📂 Project Structure

```text
├── App.js                      # Entry point, Font loading, Safe Area provider
├── src/
│   ├── api/
│   │   ├── dragonball.js       # Consolidates all Character & Planet endpoints
│   │   └── translate.js        # Logic for chunked Spanish-to-English translation
│   ├── theme/
│   │   └── colors.js           # Centralized Z-COCKPIT hex color palette
│   ├── navigation/
│   │   └── AppNavigator.js     # React Navigation (Stack + Tab) configuration
│   ├── components/
│   │   ├── GlassCard.js        # Frosted glass wrapper with Ki-glow shadows
│   │   └── CharacterCard.js    # Optimized scouter card with 'contain' image fit
│   └── screens/
│       ├── SplashScreen.js     # Cinematic animated entry
│       ├── HomeScreen.js       # Global Roster with Search
│       ├── TypesScreen.js      # Genetic Classification Grid
│       ├── PlanetsScreen.js    # Cosmos Directory Grid
│       ├── FilteredList.js     # Universal Scouter for Races & Planets
│       └── DetailScreen.js     # Full Character Dossier
```

-----

## 📑 API Integration Guide

### Character Scouter

  * **Base Fetch:** `GET /characters?page=1&limit=20`
  * **Search by Name:** `GET /characters?name={query}`
  * **Filter by Race:** `GET /characters?race={raceName}`

### Cosmos Scouter

  * **Planet List:** `GET /planets`
  * **Planet Residents:** `GET /planets/{id}` → extract the `characters` array from the response.

-----

## 🎨 UI/UX Design Philosophy

The app utilizes a **Dark-Mode Tactical HUD** aesthetic inspired by Dragon Ball scouters.

  * **Typography:**
      * *Space Grotesk* – technical data, headers, and numeric / Ki-related stats.
      * *Plus Jakarta Sans* – readable body text and character biographies.
  * **Glassmorphism:**
      * All UI elements sit on a semi-transparent background: `rgba(19, 19, 19, 0.7)`
      * Subtle **1px border** around components to simulate a futuristic scouter lens.
      * Ki-like glow effects around key elements via gradients and shadows.
  * **Safe Area & Physical Devices:**
      * Fully optimized for physical devices with notches and home bars using `useSafeAreaInsets`.
      * Consistent padding and spacing for immersive, edge-to-edge layouts.

-----

## 🔀 Navigation Strategy

Z-COCKPIT is built with a strict focus on **React Navigation** (bypassing Expo Router) for precise control over routing and transitions.

  * **Root Stack Navigator:** `SplashScreen` → `MainTabs` → `DetailScreen`
  * **Bottom Tab Navigator:**
      * **Home:** Global Roster (characters list + search)
      * **Types:** Genetic Registry (races grid)
      * **Cosmos:** Planetary Archives (planets grid)

-----

## 🧪 Development Tips

  * **Theming:** Centralize color changes in `src/theme/colors.js` to update the HUD across the entire app instantly.
  * **Performance:** Use `FlatList` for rosters and grids with stable `keyExtractor` to maintain smooth scrolling on low-end "scouter" devices.
  * **Testing:** Always test on both Android and iOS real devices to validate safe-area behavior and notch clearance.

-----

## 👤 Author

**Bhupendra S Hapawat**
Lead Developer | Z-COCKPIT Systems
Combat KI Intelligence Interface V4.0.2

-----
