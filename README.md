
# 🐉 Z-COCKPIT | Ultimate Dragon Ball Intelligence Interface

[](https://expo.dev/)
[](https://reactnavigation.org/)
[](https://opensource.org/licenses/MIT)

**Z-COCKPIT** is a high-performance, tactical mobile application built with **React Native Expo SDK 55**. It serves as a comprehensive intelligence database for the Dragon Ball universe, featuring a cinematic "Scouter" UI, real-time Spanish-to-English translation, and advanced celestial mapping.

Developed with **React Navigation** for precise routing control and a **Glassmorphic** tactical design language.

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

| Category | Technology |
| :--- | :--- |
| **Framework** | Expo SDK 55 (React Native) |
| **Navigation** | `@react-navigation/native` ( Bottom Tabs) |
| **Styling** | Custom StyleSheet with Glassmorphism principles & Shimmer Loading UI |
| **Icons** | `@expo/vector-icons` (MaterialIcons & Lucide) |
| **Fonts** | Space Grotesk (Technical) & Plus Jakarta Sans (Body) |
| **Visuals** | `expo-linear-gradient` |
| **API** | [Dragon Ball API](https://www.google.com/search?q=https://dragonball-api.com/) & MyMemory Translation API |

-----

## 📦 Installation Guide

### 1\. Clone the Repository

```bash
git clone https://github.com/undersolved/Dragon-Cockpit.git
cd Dragon-Cockpit
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Ensure SDK 55 Compatibility

If you are upgrading an existing project or environment, run:

```bash
npx expo install --fix
```

### 4\. Required UI Libraries

```bash
npx expo install \
  @expo-google-fonts/space-grotesk \
  @expo-google-fonts/plus-jakarta-sans \
  expo-font \
  expo-linear-gradient \
  react-native-safe-area-context \
  react-native-screens \
  react-native-gesture-handler
```

### 5\. Launch the Cockpit

```bash
npx expo start
```

*Scan the QR code with the **Expo Go** app on Android or iOS.*

-----

## 📂 Project Structure

```text
├── App.js                  # Entry point & Font loading
├── src/
│   ├── api/
│   │   ├── dragonball.js   # API endpoints for Characters & Planets
│   │   └── translate.js    # Spanish-to-English translation logic
│   ├── theme/
│   │   └── colors.js       # Centralized Z-COCKPIT palette
│   ├── navigation/
│   │   └── AppNavigator.js # Stack + Tab configuration
│   ├── components/
│   │   ├── GlassCard.js    # Frosted glass UI wrapper
│   │   └── CharacterCard.js# Optimized scouter card
│   └── screens/
│       ├── SplashScreen.js # Cinematic entry animation
│       ├── HomeScreen.js   # Global Roster with Search
│       ├── TypesScreen.js  # Genetic Classification Grid
│       ├── PlanetsScreen.js# Cosmos Directory
│       └── DetailScreen.js # Full Character Dossier
```

-----

## 🎨 UI/UX Design Philosophy

The app utilizes a **Dark-Mode Tactical HUD** aesthetic inspired by Dragon Ball scouters and Frieza Force technology.

  * **Glassmorphism:** All UI elements sit on a semi-transparent background (`rgba(19, 19, 19, 0.7)`) with a subtle **1px border** to simulate a futuristic scouter lens.
  * **Typography:** \* *Space Grotesk*: Used for technical data, headers, and Ki-related stats.
      * *Plus Jakarta Sans*: Optimized for readable body text and character biographies.
  * **Ki Glow:** Strategic use of gradients and shadows to simulate energy signatures around character cards.

-----

## 👤 Author

**Bhupendra Singh Hapawat** Lead Developer | Z-COCKPIT Systems  
*MCA Final Semester | Full-Stack & AI Enthusiast*

-----
