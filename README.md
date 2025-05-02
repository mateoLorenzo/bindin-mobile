# Bindin - Mobile Poll & Form Builder

<div align="center">
  <img width="150" alt="Demo bindin 1" src="https://github.com/user-attachments/assets/77f9e7e4-ae69-4796-a957-85482152e726" />
  <img width="150" alt="Demo bindin 2" src="https://github.com/user-attachments/assets/3205fad6-da99-49e9-ae75-c5c96cc9d37a" />
  <img width="150" alt="Demo bindin 3" src="https://github.com/user-attachments/assets/4e8aac99-547b-47cf-a5dd-e13edf711bf3" />
  <img width="150" alt="Demo bindin 4" src="https://github.com/user-attachments/assets/2e906411-65f4-4d7a-bc9d-1fdda07e4ced" />
  <img width="150" alt="Demo bindin 5" src="https://github.com/user-attachments/assets/3dd6c43d-4e0f-49d2-bf4a-34871120e302" />
  <img width="150" alt="Demo bindin 6" src="https://github.com/user-attachments/assets/149aff7b-206f-4bfe-9eb8-0c0297a13e87" />
</div>

## 📱 About The Project

Bindin is a React Native implementation of a poll and form builder challenge, originally designed for web but adapted for mobile. The app enables users to create and participate in both simple polls and complex forms, featuring a modern dark theme UI and smooth animations.

This project demonstrates the adaptation of web-focused requirements into a native mobile experience, maintaining the core functionality while embracing mobile-first design patterns and native UI components.

### Key Features

- 📊 Create and participate in single-choice polls with real-time results
- 📝 Build multi-question forms with various input types:
  - Short answer text inputs
  - Long answer text areas
  - Numeric inputs
  - Single choice options
- 🎨 Custom-designed dark theme UI optimized for mobile
- ⚡ Smooth animations and transitions between steps
- 📱 Native mobile components and interactions
- 💾 Local storage for data persistence
- 🔍 Custom hints and placeholders for form questions

### Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your physical device (optional)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/bindin-mobile.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. If haven't got expo, install it running

   ```bash
   yarn add expo
   ```

4. Start the development server
   ```bash
   npx expo start --tunnel
   ```

### Running the App

You can run the app in multiple ways:

- Scan the QR code with Expo Go (iOS/Android)
- Press 'i' for iOS simulator
- Press 'a' for Android emulator

## 🎯 Project Structure

```
bindin-mobile/
├── app/                    # Main application code
│   ├── (auth)/            # Authentication related screens
│   ├── (home)/            # Main app screens
│   └── _layout.tsx        # Root layout component
├── components/            # Reusable components
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── assets/               # Images, fonts, etc.
```

## 📋 Features Implementation

### Forms and Polls

- Multiple question types support (Short answer, Long answer, Numeric, Single choice)
- Custom hints for questions
- Real-time validation
- Animated transitions between questions

### UI/UX

- Consistent dark theme throughout the app
- Smooth animations for better user experience
- Responsive design that works on all screen sizes
- Custom components for better code reusability

## 🛠️ Technical Decisions

- Used TypeScript for better type safety and development experience
- Implemented file-based routing with Expo Router for better navigation management
- Created custom components for consistent UI across the app
- Used AsyncStorage for local data persistence
- Implemented proper form validation and error handling

## 👤 Author

**Mateo Lorenzo**
