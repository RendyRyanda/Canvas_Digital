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
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Edit } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";

export default function Profile() {
  const navigation = useNavigation();

  // STATE
  const [museumData, setMuseumData] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET API
  const getMuseum = async () => {
    try {
      const response = await axios.get(
        "https://6a06e0f6c83ba8ad9b3e0dc9.mockapi.io/museum/",
      );

      setMuseumData(response.data);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Text style={styles.title}>My Profile</Text>

        {/* FOTO PROFILE */}
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/89/d1/1f/89d11f113d5604805485762deaea2ec6.jpg",
            }}
            style={styles.image}
          />
        </View>

        {/* NAMA */}
        <Text style={styles.name}>CanvasDigital User</Text>

        <Text style={styles.email}>user@email.com</Text>

        {/* BUTTON */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary}>Favorit</Text>
          </TouchableOpacity>
        </View>

        {/* TITLE LIST */}
        <Text style={styles.sectionTitle}>Museum Saya</Text>

        {/* LIST DATA API */}
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
                navigation.navigate("EditMuseum", {
                  museumId: item.id,
                })
              }
            >
              <Image
                source={{
                  uri: item.gambar,
                }}
                style={styles.cardImage}
              />

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nama}</Text>

                <Text style={styles.cardCategory}>{item.kategori}</Text>

                <Text style={styles.cardProvince}>{item.provinsi}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* FLOATING BUTTON */}
      <Pressable
        style={({ pressed }) => [
          styles.floatingButton,
          {
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
        onPress={() => navigation.navigate("AddMuseum")}
      >
        <Edit color="white" size={22} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },

  imageWrapper: {
    padding: 5,
    borderRadius: 60,
    backgroundColor: "#4A90E2",
    alignSelf: "center",
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 25,
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

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonTextSecondary: {
    color: "#4A90E2",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
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

  cardProvince: {
    color: "#777",
    marginTop: 3,
  },

  floatingButton: {
    backgroundColor: "#2563eb",
    padding: 18,
    position: "absolute",
    bottom: 24,
    right: 24,
    borderRadius: 20,

    shadowColor: "#2563eb",
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
