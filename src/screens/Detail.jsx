import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail({ route }) {
  // AMBIL DATA DARI NAVIGATION
  const { museum } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* HERO IMAGE */}
        <ImageBackground
          source={{
            uri: museum.gambar,
          }}
          style={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>{museum.nama}</Text>
          </View>
        </ImageBackground>

        {/* INFO BAWAH GAMBAR */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>📍 Provinsi</Text>

            <Text style={styles.infoValue}>{museum.provinsi}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>🏛️ Kategori</Text>

            <Text style={styles.infoValue}>{museum.kategori}</Text>
          </View>
        </View>

        {/* DESKRIPSI */}
        <View style={styles.content}>
          <Text style={styles.section}>Deskripsi</Text>

          <Text style={styles.desc}>{museum.deskripsi}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
  },

  image: {
    height: 250,
    justifyContent: "flex-end",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 15,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 15,
  },

  infoBox: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 14,
    color: "#555",
  },

  content: {
    padding: 15,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
});
