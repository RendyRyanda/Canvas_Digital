import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// IMPORT DATA & COMPONENT
import museumData from "./src/data/museum";
import MuseumCard from "./src/components/MuseumCard";

export default function App() {
  // STATE
  const [search, setSearch] = useState("");

  // FILTER
  const filteredMuseum = museumData.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>CanvasDigital</Text>

      {/* GRID */}
      <View style={styles.grid}>
        <View style={styles.box}>
          <Text>Provinsi</Text>
        </View>
        <View style={styles.box}>
          <Text>Kategori Museum</Text>
        </View>
        <View style={styles.box}>
          <Text>Museum Terpopuler</Text>
        </View>
        <View style={styles.box}>
          <Text>Favorit</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Museum Terbaru</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Cari museum..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {/* FLATLIST */}
      <FlatList
        data={filteredMuseum}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MuseumCard nama={item.nama} gambar={item.gambar} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  box: {
    width: "48%",
    height: 80,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  search: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
});
