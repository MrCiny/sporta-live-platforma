import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import MainHeader from "@/components/mainHeader";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase-client";
import { useTheme } from "@/components/themeContext";
import { getStyles } from "@/styles/styles";


export default function Sports() {
    const [loading, setLoading] = useState(true)
    const [sportsNews, setSportsNews] = useState([]);
    const [liveStreams, setLiveStreams] = useState([]);
    const { theme, toggleTheme } = useTheme();
            
    const styles = getStyles(theme);

    useEffect(() => {
        async function getSportaZinas() {
            let { data: Sporta_zinas, error } = await supabase
                .from('Sporta_zinas')
                .select('*')
                .range(0,2)
    
            setSportsNews(Sporta_zinas);
            getTiesraides();
        };

        async function getTiesraides() {
            let { data, error } = await supabase
                .from('Tiesraide')
                .select('*')
                .range(0,5)
    
                setLiveStreams(data);
            setLoading(false)
        };

        getSportaZinas();
    }, [])

    const renderLiveStreams = () => (
        <>
            <Text style={styles.headerText}>Sporta tiešraides tev</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveContainer}>
                {liveStreams.map((stream) => (
                    <TouchableOpacity key={stream.id} style={styles.liveCard} onPress={() => router.push({ pathname: "/(tabs)/streams", params: { id: stream.speles_id } })}>
                        <Image source={{ uri: stream.image }} style={styles.liveImage} />
                        <Text style={styles.liveTitle}>{stream.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    );

    const renderNewsItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => router.replace({pathname: "/(tabs)/news/", params: { id: item.id }})}>
                <View style={styles.newsCard}>
                    <View style={styles.newsHeader}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.avatarText}>{item.author.charAt(0)}</Text> 
                        </View>
                        <View>
                            <Text style={styles.newsAuthor}>{item.author}</Text>
                        </View>
                    </View>
                    <Image source={{ uri: item.image }} style={styles.newsImage} />
                    <Text style={styles.newsTitle}>{item.title}</Text>  
                </View>
            </TouchableOpacity>
        );
    };

    const renderListHeader = () => (
        <View style={styles.listHeader}>
            {renderLiveStreams()}
            <Text style={styles.headerText}>Sporta ziņas</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <MainHeader />
            </View>
            {!loading &&
                <FlatList
                    data={sportsNews}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNewsItem}
                    ListHeaderComponent={renderListHeader}
                    contentContainerStyle={styles.contentContainer}
                />
            }
        </SafeAreaView>
    );
}
