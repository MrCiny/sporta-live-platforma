import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Modal } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase-client";
import MainHeader from "@/components/mainHeader";
import { useTheme } from "@/components/themeContext";
import { getStyles } from "@/styles/styles";
import { AntDesign, Feather } from "@expo/vector-icons";
import StreamModal from "./components/StreamModal";


export default function StreamDashboard() {
  const [streams, setStreams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStream, setEditingStream] = useState(null);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    const { data, error } = await supabase.from("Tiesraide").select("*");
    if (error) Alert.alert("Error loading streams", error.message);
    setStreams(data || []);
  };

  const handleDelete = async (id) => {
    Alert.alert("Delete Stream", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive", onPress: async () => {
          await supabase.from("Tiesraide").delete().eq("id", id);
          fetchStreams();
        }
      }
    ]);
  };

  const renderStream = ({ item }) => (
    <View style={dashboardStyles.card}>
      <Image source={{ uri: item.image }} style={dashboardStyles.thumbnail} />
      <View style={dashboardStyles.info}>
        <Text style={dashboardStyles.title}>{item.title}</Text>
        <Text style={dashboardStyles.subtitle}>Spēles ID: {item.speles_id}</Text>
        <Text style={dashboardStyles.status}>{item.is_live ? "🟢 Live" : "⚫ Not Live"}</Text>
      </View>
      <View style={dashboardStyles.actions}>
        <TouchableOpacity onPress={() => { setEditingStream(item); setModalVisible(true); }}>
          <Feather name="edit" size={20} color="dodgerblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <AntDesign name="delete" size={20} color="crimson" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <MainHeader />
        <View style={dashboardStyles.headerRow}>
            <Text style={styles.headerText}>Livestream Dashboard</Text>
            <TouchableOpacity onPress={() => { setEditingStream(null); setModalVisible(true); }} style={dashboardStyles.addButton}>
                <Text style={dashboardStyles.addButtonText}>+ Create</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data={streams}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderStream}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        />
        <StreamModal
            visible={modalVisible}
            stream={editingStream}
            onClose={() => setModalVisible(false)}
        />
    </SafeAreaView>
    );
}

const dashboardStyles = StyleSheet.create({
  headerRow: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
  addButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 6 },
  addButtonText: { color: "#fff" },
  card: { backgroundColor: "#1e1e1e", padding: 12, marginBottom: 12, borderRadius: 10, flexDirection: "row", alignItems: "center" },
  thumbnail: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#fff" },
  subtitle: { fontSize: 12, color: "#ccc" },
  status: { marginTop: 4, fontSize: 13 },
  actions: { gap: 12 },
});
