import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function news({ route }) {
    const { news } = route.params; // Get the passed news item

    return (
        <View style={styles.container}>
            <Image source={{ uri: news.image }} style={styles.newsImage} />
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.author}>By {news.author}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    newsImage: { width: "100%", height: 200, borderRadius: 10 },
    title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
    author: { fontSize: 16, color: "gray", marginTop: 5 },
});
