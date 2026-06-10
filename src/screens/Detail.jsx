import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

import { supabase } from "../libs/supabase";

export default function Detail({ route, navigation }) {
  const { museum } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  const museumTitle = museum.title || museum.nama;

  const museumImage = museum.image || museum.gambar;

  const museumCategory = museum.category || museum.kategori;

  const museumDesc = museum.content || museum.deskripsi;

  const museumProvinsi = museum.provinsi;

  useEffect(() => {
    checkFavorite();
  }, []);

  // CHECK FAVORITE
  const checkFavorite = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (!user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq("museum_id", museum.id);

      if (error) throw error;

      setIsFavorite(data && data.length > 0);
    } catch (error) {
      console.log("CHECK FAVORITE ERROR:", error);
    }
  };

  // FAVORITE
  const handleFavorite = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      console.log("USER SESSION:", user);

      if (!user) {
        Alert.alert("Login Diperlukan", "Silakan login terlebih dahulu");

        return;
      }

      // HAPUS FAVORIT
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("museum_id", museum.id);

        if (error) throw error;

        setIsFavorite(false);

        Alert.alert("Berhasil", "Museum dihapus dari favorit");
      } else {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,

          museum_id: museum.id,

          title: museumTitle,

          image: museumImage,

          category: museumCategory,

          provinsi: museumProvinsi,

          content: museumDesc,
        });

        if (error) throw error;

        setIsFavorite(true);

        Alert.alert("Berhasil", "Museum ditambahkan ke favorit");
      }
    } catch (error) {
      console.log("FAVORITE ERROR:", error);

      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{
            uri: museumImage,
          }}
          style={styles.image}
        >
          <View style={styles.overlay}>
            <View style={styles.topRow}>
              <Text style={styles.title}>{museumTitle}</Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                }}
              >
                {/* FAVORITE LIST */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Favorite")}
                >
                  <Ionicons name="bookmarks" size={28} color="white" />
                </TouchableOpacity>

                {/* HEART */}
                <TouchableOpacity onPress={handleFavorite}>
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={30}
                    color={isFavorite ? "red" : "white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>📍 Provinsi</Text>

            <Text style={styles.infoValue}>{museumProvinsi}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>🏛️ Kategori</Text>

            <Text style={styles.infoValue}>{museumCategory}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.section}>Deskripsi</Text>

          <Text style={styles.desc}>{museumDesc}</Text>
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

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    width: "70%",
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
