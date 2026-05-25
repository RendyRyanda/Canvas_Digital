import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

// SUPABASE
import { supabase } from "../libs/supabase";

// COMPONENT
import MuseumCard from "../components/MuseumCard";

export default function Home() {
  const navigation = useNavigation();

  // STATE
  const [search, setSearch] = useState("");

  const [museumData, setMuseumData] = useState([]);

  const [loading, setLoading] = useState(true);

  // ANIMATION
  const scrollY = useRef(new Animated.Value(0)).current;

  // HEADER ANIMATION
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 120],

    outputRange: [0, -250],

    extrapolate: "clamp",
  });

  // GET DATA SUPABASE
  const getMuseum = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("createdAt", {
          ascending: false,
        });

      if (error) throw error;

      // FORMAT DATA
      const formattedData = data.map((item) => ({
        id: item.id.toString(),

        nama: item.title,

        provinsi: item.provinsi,

        kategori: item.category,

        deskripsi: item.Deskripsi || item.content,

        gambar: item.image,
      }));

      setMuseumData(formattedData);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  // LOAD DATA
  useEffect(() => {
    getMuseum();
  }, []);

  // FILTER SEARCH
  const filteredMuseum = museumData.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Animated.View
        style={[
          styles.topContainer,

          {
            transform: [
              {
                translateY: headerTranslate,
              },
            ],

            opacity: scrollY.interpolate({
              inputRange: [0, 100],

              outputRange: [1, 0],

              extrapolate: "clamp",
            }),
          },
        ]}
      >
        {/* TITLE */}
        <Text style={styles.header}>CanvasDigital</Text>

        {/* GRID */}
        <View style={styles.grid}>
          {/* PROVINSI */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Provinsi</Text>
          </View>

          {/* CATEGORY */}
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Category")}
          >
            <Text style={styles.boxText}>Kategori Museum</Text>
          </TouchableOpacity>

          {/* POPULER */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Museum Terpopuler</Text>
          </View>

          {/* FAVORITE */}
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Favorite")}
          >
            <Text style={styles.boxText}>Favorit</Text>
          </TouchableOpacity>
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>Museum Terbaru</Text>

        {/* SEARCH */}
        <TextInput
          placeholder="Cari museum..."
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />
      </Animated.View>

      {/* LOADING */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <Animated.FlatList
          data={filteredMuseum}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 320,
            paddingBottom: 20,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Detail", {
                  museum: {
                    id: item.id,

                    nama: item.nama,

                    gambar: item.gambar,

                    kategori: item.kategori,

                    deskripsi: item.deskripsi,

                    provinsi: item.provinsi,
                  },
                })
              }
            >
              <MuseumCard nama={item.nama} gambar={item.gambar} />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  topContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    zIndex: 1000,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#111827",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  box: {
    width: "48%",
    height: 85,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 18,
  },

  boxText: {
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#111827",
  },

  search: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#f9fafb",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
