import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { supabase } from "../libs/supabase";

export default function Favorite() {
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  // GET FAVORITES
  const getFavorites = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setFavorites(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Museum Favorit</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Detail", {
                  museum: {
                    id: item.museum_id,

                    nama: item.title,

                    gambar: item.image,

                    kategori: item.category,

                    provinsi: item.provinsi,

                    content: item.content,
                  },
                })
              }
            >
              {/* IMAGE */}
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.image}
              />

              {/* CONTENT */}
              <View style={styles.content}>
                {/* TITLE */}
                <Text style={styles.name}>{item.title}</Text>

                {/* CATEGORY */}
                <Text style={styles.category}>🏛️ {item.category}</Text>

                {/* PROVINSI */}
                <Text style={styles.provinsi}>📍 {item.provinsi}</Text>

                {/* DESKRIPSI */}
                <Text style={styles.description} numberOfLines={3}>
                  {item.content}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada museum favorit</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 200,
  },

  content: {
    padding: 16,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  category: {
    color: "#2563eb",
    marginTop: 8,
    fontWeight: "600",
    fontSize: 15,
  },

  provinsi: {
    marginTop: 6,
    color: "#6b7280",
    fontWeight: "500",
    fontSize: 14,
  },

  description: {
    marginTop: 12,
    color: "#4b5563",
    lineHeight: 22,
    fontSize: 14,
  },

  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#6b7280",
  },
});
