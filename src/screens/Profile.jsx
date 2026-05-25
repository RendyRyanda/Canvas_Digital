import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Edit } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

import { supabase } from "../libs/supabase";

export default function Profile() {
  const navigation = useNavigation();

  // STATE
  const [museumData, setMuseumData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [fullName, setFullName] = useState("");

  const [photoUrl, setPhotoUrl] = useState("");

  const [userData, setUserData] = useState(null);

  // GET USER
  const getProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setUserData(data);

      setFullName(data.full_name || "");

      setPhotoUrl(data.photo_url || "");
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE PROFILE
  const handleUpdateProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("users")
        .update({
          full_name: fullName,
          photo_url: photoUrl,
        })
        .eq("id", user.id);

      if (error) throw error;

      Alert.alert("Berhasil", "Profile berhasil diupdate");

      setModalVisible(false);

      getProfile();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", error.message);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      Alert.alert("Berhasil", "Logout berhasil");

      // PINDAH KE LOGIN
      navigation.replace("Login");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", error.message);
    }
  };

  // GET MUSEUM
  const getMuseum = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("createdAt", {
          ascending: false,
        });

      if (error) throw error;

      setMuseumData(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getMuseum();

    getProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: userData?.photo_url || "https://i.pravatar.cc/300",
            }}
            style={styles.profileImage}
          />

          <Text style={styles.name}>
            {userData?.full_name || "CanvasDigital User"}
          </Text>

          <Text style={styles.email}>{userData?.email}</Text>

          {/* BUTTON */}
          <View style={styles.buttonContainer}>
            {/* EDIT PROFILE */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* FAVORITE */}
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate("Favorite")}
            >
              <Text style={styles.buttonTextSecondary}>Favorit</Text>
            </TouchableOpacity>

            {/* LOGOUT */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>Museum Saya</Text>

        {/* LOADING */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2563eb"
            style={{ marginTop: 30 }}
          />
        ) : (
          museumData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate("EditMuseumForm", {
                  museumId: item.id,
                })
              }
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.cardImage}
              />

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <Text style={styles.cardCategory}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* FLOATING BUTTON */}
      <Pressable
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddMuseumForm")}
      >
        <Edit color="white" size={22} />
      </Pressable>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            {/* NAME */}
            <TextInput
              placeholder="Nama Lengkap"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />

            {/* PHOTO */}
            <TextInput
              placeholder="Photo URL"
              style={styles.input}
              value={photoUrl}
              onChangeText={setPhotoUrl}
            />

            {/* SAVE */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.saveButtonText}>Simpan</Text>
            </TouchableOpacity>

            {/* CLOSE */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
    paddingHorizontal: 20,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },

  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },

  buttonSecondary: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#4A90E2",
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonTextSecondary: {
    color: "#4A90E2",
    fontWeight: "bold",
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  cardImage: {
    width: "100%",
    height: 180,
  },

  cardContent: {
    padding: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cardCategory: {
    color: "#2563eb",
    marginTop: 5,
  },

  floatingButton: {
    backgroundColor: "#2563eb",
    padding: 18,
    position: "absolute",
    bottom: 24,
    right: 24,
    borderRadius: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  cancelButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#eee",
  },
});
