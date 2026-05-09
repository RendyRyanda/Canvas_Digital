import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function AddMuseumForm() {
  const navigation = useNavigation();

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

  const handleSubmit = () => {
    Alert.alert("Berhasil", `Museum ${museumData.nama} berhasil ditambahkan`);

    console.log(museumData);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="black" />
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
});
