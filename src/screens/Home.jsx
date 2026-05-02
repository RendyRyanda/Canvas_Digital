import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

// IMPORT DATA & COMPONENT
import museumData from "../data/museum";
import MuseumCard from "../components/MuseumCard";

export default function Home() {
  const navigation = useNavigation();

  // STATE
  const [search, setSearch] = useState("");

  // ANIMATED
  const scrollY = useRef(new Animated.Value(0)).current;

  // HEADER HILANG SAAT SCROLL
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -250],
    extrapolate: "clamp",
  });

  // FILTER
  const filteredMuseum = museumData.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER + MENU + SEARCH */}
      <Animated.View
        style={[
          styles.topContainer,
          {
            transform: [{ translateY: headerTranslate }],
            opacity: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <Text style={styles.header}>CanvasDigital</Text>

        {/* GRID MENU */}
        <View style={styles.grid}>
          <View style={styles.box}>
            <Text>Provinsi</Text>
          </View>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Category")}
          >
            <Text>Kategori Museum</Text>
          </TouchableOpacity>

          <View style={styles.box}>
            <Text>Museum Terpopuler</Text>
          </View>

          <View style={styles.box}>
            <Text>Favorit</Text>
          </View>
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

      {/* LIST */}
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
                contentOffset: { y: scrollY },
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
                museum: item,
              })
            }
          >
            <MuseumCard nama={item.nama} gambar={item.gambar} />
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
