import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase-client";
import MainHeader from "@/components/mainHeader";
import { useTheme } from "@/components/themeContext";
import { getStyles } from "@/styles/styles";

export default function news() {
    const params = useLocalSearchParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const styles = getStyles(theme);
    
    useEffect(() => {
        checkAccess()
    }, [params.id])

    const checkAccess = async () => {
        const { data: { user } } = await supabase.auth.getUser();
          
        if (!user) {
            router.replace("/(auth)/login");
            return;
        }

        getSportaZinas();
    }

    async function getSportaZinas() {
            let { data: Sporta_zinas, error } = await supabase
                .from('Sporta_zinas')
                .select('*')
                .eq('id', params.id)
    
                setNews(Sporta_zinas[0]);
            setLoading(false)
        };

    return (
        <>
            <MainHeader />
            <ScrollView contentContainerStyle={styles.crollContainer}>
                {!loading &&
                    <View style={styles.newsContainer}>
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