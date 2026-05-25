import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

import { supabase } from "../libs/supabase";

export default function AddMuseumForm({ navigation }) {
  const [loading, setLoading] = useState(false);

  const [museumData, setMuseumData] = useState({
    nama: "",
    provinsi: "",
    kategori: "",
    deskripsi: "",
    gambar: "",
  });

  // HANDLE INPUT
  const handleChange = (key, value) => {
    setMuseumData({
      ...museumData,
      [key]: value,
    });
  };

  // INSERT DATA
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.from("blogs").insert({
        title: museumData.nama,
        provinsi: museumData.provinsi,
        category: museumData.kategori,
        Deskripsi: museumData.deskripsi,
        image: museumData.gambar,
        createdAt: new Date(),
      });

      if (error) throw error;

      setLoading(false);

      Alert.alert("Berhasil", `${museumData.nama} berhasil ditambahkan`);

      navigation.goBack();
    } catch (error) {
      console.log(error);

      setLoading(false);

      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* FORM */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <Text style={styles.pageTitle}>Tambah Museum</Text>

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
            placeholder="Masukkan kategori"
            style={styles.input}
            value={museumData.kategori}
            onChangeText={(text) => handleChange("kategori", text)}
          />
        </View>

        {/* GAMBAR */}
        <View>
          <Text style={styles.label}>URL Gambar</Text>

          <TextInput
            placeholder="Masukkan URL gambar"
            style={styles.input}
            value={museumData.gambar}
            onChangeText={(text) => handleChange("gambar", text)}
          />
        </View>

        {/* DESKRIPSI */}
        <View>
          <Text style={styles.label}>Deskripsi</Text>

          <TextInput
            multiline
            placeholder="Masukkan deskripsi museum"
            style={[styles.input, styles.textArea]}
            value={museumData.deskripsi}
            onChangeText={(text) => handleChange("deskripsi", text)}
          />
        </View>
      </ScrollView>

      {/* BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Tambah Museum</Text>
        </TouchableOpacity>
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
    paddingTop: 10,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#111827",
  },

  formContainer: {
    padding: 20,
    paddingBottom: 120,
    gap: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#f9fafb",
    fontSize: 15,
  },

  textArea: {
    height: 140,
    textAlignVertical: "top",
  },

  bottomBar: {
    padding: 20,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
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
