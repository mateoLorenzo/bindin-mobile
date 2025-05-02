# Bindin Challenge - Mateo Lorenzo

<div align="center">


https://github.com/user-attachments/assets/d51240e8-9ac5-4849-b117-9233bb2cc71e


</div>


## 📱 About The Project

Bindin is a React Native implementation of a poll and form builder challenge, built with scalability in mind allowing users to create and participate in both simple polls and complex forms, featuring a modern dark theme UI and smooth animations.

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

## 🎨 Design

The UI/UX design for this project was created in Figma. You can view and interact with the design files here:

[![Figma Design](https://img.shields.io/badge/Figma-Design-FF6B6B?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/HQZIiREqknCArdK5cy72TH/Mobb?node-id=513-2&p=f&t=rBq4SBnHMtzOtoig-0)

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
├── app/                   # Main application code
│   ├── (auth)/            # Authentication related screens
│   ├── (home)/            # Main app screens
│   └── _layout.tsx        # Root layout component
├── components/            # Reusable components
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── assets/                # Images, fonts, etc.
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

**Mateo Lorenzo** 💻
