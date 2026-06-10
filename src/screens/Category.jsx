import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { supabase } from "../libs/supabase";

export default function Category() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const [kategori, setKategori] = useState([
    {
      id: "1",
      nama: "Museum Transportasi & Otomotif",
      gambar: "https://perjalanan.id/wp-content/uploads/2025/04/1-770x470.webp",
      total: 0,
    },
    {
      id: "2",
      nama: "Museum Sejarah & Peradaban",
      gambar: "https://getlost.id/wp-content/uploads/2021/04/Samsul-Arifin.jpg",
      total: 0,
    },
    {
      id: "3",
      nama: "Museum Fosil & Prasejarah",
      gambar:
        "https://statik.tempo.co/data/2020/10/13/id_973556/973556_720.jpg",
      total: 0,
    },
    {
      id: "4",
      nama: "Museum Seni & Budaya",
      gambar:
        "https://kcic.co.id/lkapp/wp-content/uploads/2021/07/Museum-Keramik.jpg",
      total: 0,
    },
    {
      id: "5",
      nama: "Museum Sains & Teknologi",
      gambar:
        "https://images.trvl-media.com/place/553248621562274580/3b27f621-b333-43e0-aeea-5bdc52f7eb2e.jpg",
      total: 0,
    },
  ]);

  const getKategori = async () => {
    try {
      const { data, error } = await supabase.from("blogs").select("*");

      if (error) throw error;

      const updatedKategori = kategori.map((item) => ({
        ...item,
        total: data.filter(
          (museum) =>
            museum.category?.trim().toLowerCase() ===
            item.nama.trim().toLowerCase(),
        ).length,
      }));

      setKategori(updatedKategori);

      setLoading(false);
    } catch (error) {
      console.log("CATEGORY ERROR:", error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getKategori();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kategori Museum</Text>

      <FlatList
        data={kategori}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CategoryDetail", {
                category: item.nama,
              })
            }
          >
            <ImageBackground
              source={{
                uri: item.gambar,
              }}
              style={styles.card}
              imageStyle={{
                borderRadius: 20,
              }}
            >
              <View style={styles.overlay}>
                <Text style={styles.text}>{item.nama}</Text>

                <Text style={styles.total}>{item.total} Museum</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    height: 140,
    marginBottom: 18,
    justifyContent: "flex-end",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 15,
    borderRadius: 20,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  total: {
    color: "#fff",
    marginTop: 6,
    fontSize: 14,
  },
});
