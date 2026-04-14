import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* HERO IMAGE */}
        <ImageBackground
          source={{
            uri: "https://www.museumnasional.or.id/wp-content/uploads/2022/12/bagian-depan-1536x661.jpg",
          }}
          style={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Museum Nasional</Text>
          </View>
        </ImageBackground>

        {/* DESKRIPSI */}
        <View style={styles.content}>
          <Text style={styles.section}>Deskripsi</Text>
          <Text style={styles.desc}>
            Museum Nasional Indonesia merupakan salah satu museum terbesar di
            Asia Tenggara yang menyimpan berbagai koleksi sejarah, budaya, dan
            artefak penting dari seluruh Nusantara.
          </Text>

          {/* INFO CARD */}
          <View style={styles.card}>
            <Text style={styles.info}>📍 Alamat</Text>
            <Text style={styles.value}>
              Jl. Medan Merdeka Barat No.12, Jakarta
            </Text>

            <Text style={styles.info}>🕒 Jam Operasional</Text>
            <Text style={styles.value}>08.00 - 16.00 WIB</Text>

            <Text style={styles.info}>💰 Harga Tiket</Text>
            <Text style={styles.value}>Rp5.000 - Rp15.000</Text>
          </View>
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

  content: {
    padding: 15,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  info: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },

  value: {
    fontSize: 14,
    color: "#555",
  },
});
