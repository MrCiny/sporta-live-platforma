import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { supabase } from "@/lib/supabase-client";
import { router } from "expo-router";
import { useTheme } from "@/components/themeContext";
import { getStyles } from "@/styles/styles";

export default function Volleyball() {
    const [loading, setLoading] = useState(true)
    const [sportsNews, setSportsNews] = useState([]);
    const [liveStreams, setLiveStreams] = useState([]);
    const [authors, setAuthors] = useState([])
    const { theme, toggleTheme } = useTheme();
        
    const styles = getStyles(theme);

    useEffect(() => {
        getSportaZinas();
    }, [])

    const screenWidth = Dimensions.get("window").width;
    const isSmallDevice = screenWidth < 600;

    const getAuthors = async () => {
        let { data, error } = await supabase
            .from('Users')
            .select('id,name')
            .eq('role', 'Author')
        
        if (error) console.log(error.message)

        setAuthors(data)
    }

    const getSportaZinas = async () => {
        let { data: Sporta_zinas, error } = await supabase
            .from('Sporta_zinas')
            .select('*')
            .eq('sport', 'volleyball')

        if (error) console.log(error.message)

        setSportsNews(Sporta_zinas);
        getAuthors()
        getTiesraides();
    };

    const getTiesraides = async () => {
        let { data, error } = await supabase
            .from('Tiesraide')
            .select('*')
            .eq('sport', 'volleyball')
            .range(0,5)

        if (error) console.log(error.message)

        setLiveStreams(data)
        setLoading(false)
    };

    const renderLiveStreams = () => (
        <>
            <Text style={styles.headerText}>Volejbola tiešraides tev</Text>
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
        const author = authors.find(x => x.id === item.author_id)
        
        return (
            <TouchableOpacity key={item.id} onPress={() => router.navigate({pathname: "/(tabs)/news/", params: { id: item.id }})}>
                <View style={styles.newsCard}>
                    <View style={styles.newsHeader}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.avatarText}>{author ? author.name.charAt(0) : ""}</Text> 
                        </View>
                        <View>
                            <Text style={styles.newsAuthor}>{author ? author.name : ""}</Text>
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
            <Text style={styles.headerText}>Volejbola ziņas</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {!loading &&
                <FlatList
                    key={`numColumns-${isSmallDevice ? 1 : Math.floor(screenWidth/ 590)}`} 
                    numColumns={isSmallDevice ? 1 : Math.floor(screenWidth/590)}
                    data={sportsNews}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNewsItem}
                    ListHeaderComponent={renderListHeader}
                    contentContainerStyle={styles.contentContainer}
                    ItemSeparatorComponent={() => <View style={{height: 20, width: 10}} />}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    headerContainer: { width: "100%", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10},
    contentContainer: { paddingTop: 80, backgroundColor: "#fff", paddingHorizontal: 10},
    listHeader: { marginBottom: 10 },
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
