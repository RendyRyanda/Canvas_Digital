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

import { Picker } from "@react-native-picker/picker";

import { useNavigation } from "@react-navigation/native";

import { supabase } from "../libs/supabase";

export default function EditMuseumForm({ route }) {
  const navigation = useNavigation();

  const { museumId } = route.params;

  const [loading, setLoading] = useState(true);

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
        nama: data.title || "",
        provinsi: data.provinsi || "",
        kategori: data.category || "",
        deskripsi: data.content || "",
        gambar: data.image || "",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);

      Alert.alert("Error", error.message);
    }
  };

  const handleChange = (key, value) => {
    setMuseumData({
      ...museumData,
      [key]: value,
    });
  };

  // UPDATE
  const handleUpdate = async () => {
    if (
      !museumData.nama ||
      !museumData.provinsi ||
      !museumData.kategori ||
      !museumData.deskripsi ||
      !museumData.gambar
    ) {
      Alert.alert("Peringatan", "Semua field wajib diisi");

      return;
    }

    try {
      setLoading(true);

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

      Alert.alert("Berhasil", "Museum berhasil diperbarui");

      navigation.goBack();
    } catch (error) {
      console.log(error);

      setLoading(false);

      Alert.alert("Error", error.message);
    }
  };

  // DELETE
  const handleDelete = async () => {
    Alert.alert("Hapus Museum", "Yakin ingin menghapus museum ini?", [
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Edit Museum</Text>

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
          <Text style={styles.label}>Kategori Museum</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={museumData.kategori}
              onValueChange={(value) => handleChange("kategori", value)}
            >
              <Picker.Item label="Pilih Kategori Museum" value="" />

              <Picker.Item
                label="Museum Transportasi & Otomotif"
                value="Museum Transportasi & Otomotif"
              />

              <Picker.Item
                label="Museum Sejarah & Peradaban"
                value="Museum Sejarah & Peradaban"
              />

              <Picker.Item
                label="Museum Fosil & Prasejarah"
                value="Museum Fosil & Prasejarah"
              />

              <Picker.Item
                label="Museum Seni & Budaya"
                value="Museum Seni & Budaya"
              />

              <Picker.Item
                label="Museum Sains & Teknologi"
                value="Museum Sains & Teknologi"
              />
            </Picker>
          </View>
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

        {/* UPDATE */}
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Museum</Text>
        </TouchableOpacity>

        {/* DELETE */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Hapus Museum</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#111827",
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
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#f9fafb",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  },

  textArea: {
    height: 130,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
