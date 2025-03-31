import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { supabase } from "../../../lib/supabase-client";
import MainHeader from "../../../components/mainHeader";

export default function news() {
    const params = useLocalSearchParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function getSportaZinas() {
            let { data: Sporta_zinas, error } = await supabase
                .from('Sporta_zinas')
                .select('*')
                .eq('id', params.id)
    
                setNews(Sporta_zinas[0]);
                console.log(Sporta_zinas)
            setLoading(false)
        };

        getSportaZinas();
    }, [params.id])

    return (
        <>
            <MainHeader />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {!loading &&
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: news.image }} style={styles.newsImage} />
                            <View style={styles.overlay} />
                        </View>
                        <Text style={styles.title}>{news.title}</Text>
                        <Text style={styles.author}>By {news.author}</Text>
                        <Text style={styles.date}>Published on {news.published}</Text>
                        <Text style={styles.description}>{news.description}</Text>
                    </View>
                }
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    crollContainer: {
        flexGrow: 1,
        backgroundColor: "#F5F5F5",
        paddingBottom: 20,
    },
    container: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    imageContainer: {
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
    },
    newsImage: {
        width: "100%",
        height: 200,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 15,
        textAlign: "center",
    },
    author: {
        fontSize: 16,
        color: "gray",
        marginTop: 5,
        textAlign: "center",
    },
    date: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
        marginTop: 3,
        textAlign: "center",
    },
    description: {
        fontSize: 18,
        marginTop: 15,
        lineHeight: 26,
        textAlign: "justify",
    }
});
