# Nudge

A low-friction social interaction app built with React Native (Expo) for Android.

## Features

### Free Tier
- **Vibe Check Dashboard**: 2x2 grid of circular friend avatars
- **Haptic Feedback**: Tapping avatars triggers native phone vibration
- **Visual Feedback**: Color pulse animation on each tap

### Pro Mode
- **Bat Signal**: Toggle switch to broadcast "I am Free" status
- **Real-time Status**: Friends instantly see your availability

## UI Design
- **Dark Mode**: Deep black background (#0a0a0a) with neon cyan accents
- **Neon Accents**: Cyan (#00ffff) primary color with magenta (#ff00ff) for Pro features
- **Modern Styling**: Glassmorphic cards with shadow effects and smooth animations

## Installation

1. **Install Expo CLI** (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the app**:
   ```bash
   expo start
   ```

4. **Run on Android**:
   - Use Expo Go app on Android device, or
   - Press 'a' in the terminal to open in Android emulator

## Tech Stack
- **Framework**: React Native
- **Platform**: Expo
- **Components**: Native View, Text, TouchableOpacity, Switch, Vibration
- **Animations**: Animated API
- **No external dependencies**: Self-contained in App.js

## Usage

1. **Send a Vibe Check**: Tap any friend avatar in the Free Tier section
   - Triggers phone vibration pattern
   - Displays color pulse animation

2. **Unlock Pro Mode**: Toggle the "Pro Mode" switch at the top
   - Reveals Bat Signal feature

3. **Broadcast Status**: In Pro Mode, tap the Bat Signal button
   - Toggle "GO LIVE" to broadcast "I am Free" to your network
   - Real-time status badge confirms broadcast

## File Structure
```
nudge/
├── App.js          (Main app component - all logic & styling)
├── app.json        (Expo configuration)
├── package.json    (Dependencies)
└── README.md       (This file)
```

## Performance
- All components use React hooks for state management
- Animations use React Native's Animated API for 60fps performance
- No extra dependencies beyond core React Native & Expo
