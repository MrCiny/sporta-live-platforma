import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function news() {
    const news = useLocalSearchParams();

    return (
        <ScrollView>
        <View style={styles.container}>
            <Image source={{ uri: news.image }} style={styles.newsImage} />
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.author}>By {news.author}</Text>
            <Text style={styles.date}>Published on {news.published}</Text>
            <Text style={styles.description}>{news.description}</Text>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    newsImage: { width: "100%", height: 100, borderRadius: 10 },
    title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
    author: { fontSize: 16, color: "gray", marginTop: 5 },
    date: { fontSize: 14, color: "gray", marginTop: 5, fontStyle: "italic" },
    description: { fontSize: 16, marginTop: 10, lineHeight: 22 },
});
