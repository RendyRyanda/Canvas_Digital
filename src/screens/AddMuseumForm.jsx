import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

export default function AddMuseumForm() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [museumData, setMuseumData] = useState({
    nama: "",
    provinsi: "",
    kategori: "",
    deskripsi: "",
    gambar: "",
  });

  const handleChange = (key, value) => {
    setMuseumData({
      ...museumData,
      [key]: value,
    });
  };

  // POST API
  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.post("https://6a06e0f6c83ba8ad9b3e0dc9.mockapi.io/museum/", {
        nama: museumData.nama,
        provinsi: museumData.provinsi,
        kategori: museumData.kategori,
        deskripsi: museumData.deskripsi,
        gambar: museumData.gambar,
        createdAt: new Date(),
      });

      setLoading(false);

      Alert.alert("Berhasil", `Museum ${museumData.nama} berhasil ditambahkan`);

      navigation.goBack();
    } catch (error) {
      console.log(error);

      setLoading(false);

      Alert.alert("Error", "Gagal menambahkan museum");
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>

        <Text style={styles.title}>Tambah Museum</Text>
      </View>

      {/* FORM */}
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 15,
        }}
      >
        {/* NAMA */}
        <View>
          <Text style={styles.label}>Nama Museum</Text>

          <TextInput
            placeholder="Masukkan nama museum"
            style={styles.input}
            value={museumData.nama}
            onChangeText={(text) => handleChange("nama", text)}
          />
        </View>

        {/* PROVINSI */}
        <View>
          <Text style={styles.label}>Provinsi</Text>

          <TextInput
            placeholder="Masukkan provinsi"
            style={styles.input}
            value={museumData.provinsi}
            onChangeText={(text) => handleChange("provinsi", text)}
          />
        </View>

        {/* KATEGORI */}
        <View>
          <Text style={styles.label}>Kategori</Text>

          <TextInput
            placeholder="Contoh: Sejarah"
            style={styles.input}
            value={museumData.kategori}
            onChangeText={(text) => handleChange("kategori", text)}
          />
        </View>

        {/* GAMBAR */}
        <View>
          <Text style={styles.label}>URL Gambar</Text>

          <TextInput
            placeholder="Masukkan link gambar"
            style={styles.input}
            value={museumData.gambar}
            onChangeText={(text) => handleChange("gambar", text)}
          />
        </View>

        {/* DESKRIPSI */}
        <View>
          <Text style={styles.label}>Deskripsi</Text>

          <TextInput
            placeholder="Masukkan deskripsi museum"
            style={[styles.input, styles.textArea]}
            multiline
            value={museumData.deskripsi}
            onChangeText={(text) => handleChange("deskripsi", text)}
          />
        </View>
      </ScrollView>

      {/* BUTTON */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Tambah Museum</Text>
        </Pressable>
      </View>

      {/* LOADING */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  bottomBar: {
    padding: 20,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
