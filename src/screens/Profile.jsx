import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>My Profile</Text>

      {/* FOTO PROFILE */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: "",
          }}
          style={styles.image}
        />
      </View>

      {/* NAMA */}
      <Text style={styles.name}>CanvasDigital User</Text>
      <Text style={styles.email}>user@email.com</Text>

      {/* BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonTextSecondary}>Favorit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#eef2f7",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  imageWrapper: {
    padding: 5,
    borderRadius: 60,
    backgroundColor: "#4A90E2",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },

  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },

  button: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
  },

  buttonSecondary: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#4A90E2",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonTextSecondary: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
});
