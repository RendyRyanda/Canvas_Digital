import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const kategori = [
  {
    id: "1",
    nama: "🚗 Museum Transportasi & Otomotif",
    gambar: "https://perjalanan.id/wp-content/uploads/2025/04/1-770x470.webp",
  },
  {
    id: "2",
    nama: "🏛️ Museum Sejarah & Peradaban",
    gambar: "https://getlost.id/wp-content/uploads/2021/04/Samsul-Arifin.jpg",
  },
  {
    id: "3",
    nama: "🦴 Museum Fosil & Prasejarah",
    gambar: "https://statik.tempo.co/data/2020/10/13/id_973556/973556_720.jpg",
  },
  {
    id: "4",
    nama: "🎨 Museum Seni & Budaya",
    gambar:
      "https://kcic.co.id/lkapp/wp-content/uploads/2021/07/Museum-Keramik.jpg",
  },
  {
    id: "5",
    nama: "🔬 Museum Sains & Teknologi",
    gambar:
      "https://images.trvl-media.com/place/553248621562274580/3b27f621-b333-43e0-aeea-5bdc52f7eb2e.jpg",
  },
];

export default function Category() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Kategori Museum</Text>

      {/* LIST */}
      <FlatList
        data={kategori}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.gambar }}
            style={styles.card}
            imageStyle={{ borderRadius: 15 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.text}>{item.nama}</Text>
            </View>
          </ImageBackground>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f4f8", // background lembut
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    height: 120,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "flex-end",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
