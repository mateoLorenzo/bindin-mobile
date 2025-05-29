import React from "react";
import { View } from "react-native";
import { AppText as Text } from "../../src/components/AppText";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
