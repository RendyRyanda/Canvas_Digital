import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function MuseumCard({ nama, gambar }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: gambar }} style={styles.image} />
      <Text style={styles.text}>{nama}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },
});
