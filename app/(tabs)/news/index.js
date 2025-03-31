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
            <ScrollView>
                {!loading &&
                    <View style={styles.container}>
                        <Image source={{ uri: news.image }} style={styles.newsImage} />
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
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    newsImage: { width: "100%", height: 100, borderRadius: 10 },
    title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
    author: { fontSize: 16, color: "gray", marginTop: 5 },
    date: { fontSize: 14, color: "gray", marginTop: 5, fontStyle: "italic" },
    description: { fontSize: 16, marginTop: 10, lineHeight: 22 },
});
