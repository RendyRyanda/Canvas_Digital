import React, { useEffect } from "react";

import { View, Text, StyleSheet, ImageBackground } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("userData");

    setTimeout(() => {
      if (token) {
        navigation.replace("Main");
      } else {
        navigation.replace("Login");
      }
    }, 2500);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
      }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>CanvasDigital</Text>

        <Text style={styles.subtitle}>Explore Indonesian Museums</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});
