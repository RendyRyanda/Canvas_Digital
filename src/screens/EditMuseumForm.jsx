import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { supabase } from "../libs/supabase";

export default function EditMuseumForm({ route }) {
  const navigation = useNavigation();

  const { museumId } = route.params;

  const [loading, setLoading] = useState(true);

  // DATA FORM
  const [museumData, setMuseumData] = useState({
    nama: "",
    provinsi: "",
    kategori: "",
    deskripsi: "",
    gambar: "",
  });

  // GET DATA
  useEffect(() => {
    getMuseumDetail();
  }, []);

  const getMuseumDetail = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", museumId)
        .single();

      if (error) throw error;

      setMuseumData({
        nama: data.title,
        provinsi: data.provinsi,
        kategori: data.category,
        deskripsi: data.content,
        gambar: data.image,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);

      Alert.alert("Error", error.message);
    }
  };

  // HANDLE INPUT
  const handleChange = (key, value) => {
    setMuseumData({
      ...museumData,
      [key]: value,
    });
  };

  // UPDATE DATA
  const handleUpdate = async () => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from("blogs")
        .update({
          title: museumData.nama,
          provinsi: museumData.provinsi,
          category: museumData.kategori,
          content: museumData.deskripsi,
          image: museumData.gambar,
        })
        .eq("id", museumId);

      if (error) throw error;

      setLoading(false);

      Alert.alert("Berhasil", "Data museum berhasil diupdate");

      navigation.goBack();
    } catch (error) {
      console.log(error);

      setLoading(false);

      Alert.alert("Error", error.message);
    }
  };

  // DELETE DATA
  const handleDelete = async () => {
    Alert.alert("Hapus Museum", "Apakah yakin ingin menghapus museum ini?", [
      {
        text: "Batal",
        style: "cancel",
      },

      {
        text: "Hapus",

        style: "destructive",

        onPress: async () => {
          try {
            setLoading(true);

            const { error } = await supabase
              .from("blogs")
              .delete()
              .eq("id", museumId);

            if (error) throw error;

            setLoading(false);

            Alert.alert("Berhasil", "Museum berhasil dihapus");

            navigation.goBack();
          } catch (error) {
            console.log(error);

            setLoading(false);

            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Museum</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
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
              style={styles.input}
              value={museumData.nama}
              onChangeText={(text) => handleChange("nama", text)}
            />
          </View>

          {/* PROVINSI */}
          <View>
            <Text style={styles.label}>Provinsi</Text>

            <TextInput
              style={styles.input}
              value={museumData.provinsi}
              onChangeText={(text) => handleChange("provinsi", text)}
            />
          </View>

          {/* KATEGORI */}
          <View>
            <Text style={styles.label}>Kategori</Text>

            <TextInput
              style={styles.input}
              value={museumData.kategori}
              onChangeText={(text) => handleChange("kategori", text)}
            />
          </View>

          {/* GAMBAR */}
          <View>
            <Text style={styles.label}>URL Gambar</Text>

            <TextInput
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
              style={[styles.input, styles.textArea]}
              value={museumData.deskripsi}
              onChangeText={(text) => handleChange("deskripsi", text)}
            />
          </View>

          {/* BUTTON UPDATE */}
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Museum</Text>
          </TouchableOpacity>

          {/* BUTTON DELETE */}
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Hapus Museum</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
