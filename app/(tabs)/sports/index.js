import React from "react";
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const liveStreams = [
    { id: "1", title: "Nīca/OtankiMilj - Rīga FC", thumbnail: "https://i.ytimg.com/vi/DD6pEKLENoA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDSZ1rMSDPWjdQE08FLWnvKjN3NEA" },
    { id: "2", title: "Nīca/OtankiMilj - Rīga FC", thumbnail: "https://i.ytimg.com/vi/DD6pEKLENoA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDSZ1rMSDPWjdQE08FLWnvKjN3NEA" },
];
  
const sportsNews = [
    { id: "1", title: "Sezonas atklāšanas svētki, Superkauss un Rīgas derbijs 1. martā", image: "https://lff.lv/files/images/_resized/0000032233_1054_527_cut.png", author: "Toms Armanis" },
    { id: "2", title: "Sezonas atklāšanas svētki, Superkauss un Rīgas derbijs 1. martā", image: "https://lff.lv/files/images/_resized/0000032233_1054_527_cut.png", author: "Toms Armanis" },
    { id: "3", title: "Sezonas atklāšanas svētki, Superkauss un Rīgas derbijs 1. martā", image: "https://lff.lv/files/images/_resized/0000032233_1054_527_cut.png", author: "Toms Armanis" },
];

export default function Sports() {
    const navigation = useNavigation();
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Tiešraides tev</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveContainer}>
                {liveStreams.map((stream) => (
                    <View key={stream.id} style={styles.liveCard}>
                        <Image source={{ uri: stream.thumbnail }} style={styles.liveImage} />
                        <Text style={styles.liveTitle}>{stream.title}</Text>
                    </View>
                ))}
            </ScrollView>
            <Text style={styles.header}>Karstākās ziņas</Text>
            <FlatList
                data={sportsNews}
                keyExtractor={(item) => item.id }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.replace({pathname: "/(tabs)/news/", params: item})}>
                        {console.log(item)}
                        <View style={styles.newsCard}>
                            <View style={styles.newsHeader}>
                                <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
                                <View>
                                    <Text style={styles.newsAuthor}>Superkauss</Text>
                                    <Text style={styles.newsSubtitle}>{item.author}</Text>
                                </View>
                            </View>
                            <Image source={{ uri: item.image }} style={styles.newsImage} />
                            <Text style={styles.newsTitle}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 10 },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    liveContainer: { flexDirection: "row", marginBottom: 20 },
    liveCard: { width: 320, borderRadius: 10, overflow: "hidden", marginRight: 10, backgroundColor: "#f9f9f9", padding: 10 },
    liveImage: { width: "100%", height: 170, borderRadius: 10 },
    liveTitle: { fontSize: 16, fontWeight: "bold", textAlign: "center", padding: 5 },
    newsCard: { marginBottom: 20, borderRadius: 10, overflow: "hidden", backgroundColor: "#fff", padding: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    newsHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#6200ea", justifyContent: "center", alignItems: "center", marginRight: 10 },
    avatarText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    newsAuthor: { fontSize: 16, fontWeight: "bold" },
    newsSubtitle: { fontSize: 14, color: "gray" },
    newsImage: { width: "100%", height: 150, borderRadius: 10 },
    newsTitle: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
});
