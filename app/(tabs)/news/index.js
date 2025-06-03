import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, ScrollView } from "react-native"
import { supabase } from "@/lib/supabase-client"
import { useTheme } from "@/components/themeContext"
import { getStyles } from "@/styles/styles"

export default function news() {
    const params = useLocalSearchParams()
    const [news, setNews] = useState([])
    const [author, setAuthor] = useState("")
    const [loading, setLoading] = useState(true)
    const { theme } = useTheme()
    const styles = getStyles(theme)
    
    useEffect(() => {
        checkAccess()
    }, [params.id])

    const checkAccess = async () => {
        const { data: { user } } = await supabase.auth.getUser()
          
        if (!user) {
            router.navigate("/(auth)/login");
            return;
        }

        getSportaZinas()
    }

    const getSportaZinas = async () => {
        let { data, error } = await supabase
            .from('Sporta_zinas')
            .select('*')
            .eq('id', params.id)

        if (error) console.log(error.message)

        setNews(data[0])
        getAuthor(data[0].author_id)
    };

    const getAuthor = async (id) => {
        let { data, error } = await supabase
            .from('Users')
            .select('name')
            .eq('id', id)

        if (error) console.log(error.message)

        setAuthor(data[0].name)
        setLoading(false)
    }

    return (
        <ScrollView contentContainerStyle={styles.crollContainer}>
            {!loading &&
                <View style={styles.newsContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: news.image }} style={styles.newsImage} />
                        <View style={styles.overlay} />
                    </View>
                    <Text style={styles.title}>{news.title}</Text>
                    <Text style={styles.author}>By {author}</Text>
                    <Text style={styles.date}>Published on {news.published}</Text>
                    <Text style={styles.description}>{news.description}</Text>
                </View>
            }
        </ScrollView>
    );
}