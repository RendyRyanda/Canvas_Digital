import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>CanvasDigital</Text>

      {/* GRID 4 KOTAK */}
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

      {/* MUSEUM TERBARU */}
      <Text style={styles.sectionTitle}>Museum Terbaru</Text>

      {/* SEARCH BAR */}
      <TextInput placeholder="Cari museum..." style={styles.search} />

      {/* LIST MUSEUM */}
      <ScrollView>
        {/* Museum Angkut */}
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08",
            }}
            style={styles.image}
          />
          <Text style={styles.cardText}>Museum Angkut</Text>
        </View>

        {/* Museum Nasional */}
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://www.museumnasional.or.id/wp-content/uploads/2022/12/bagian-depan-1536x661.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.cardText}>Museum Nasional</Text>
        </View>

        {/* Museum Batik */}
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://cdn.sanity.io/images/iq05vsds/production/0fd626ff9c9cd5b3ec1c3d6a2d1911c9f9144f40-1280x1920.png",
            }}
            style={styles.image}
          />
          <Text style={styles.cardText}>Museum Batik</Text>
        </View>
      </ScrollView>
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

  card: {
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },

  cardText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },
});
