import React, { useEffect, useState } from "react"
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform, Dimensions } from "react-native"
import { router } from "expo-router"
import { supabase } from "@/lib/supabase-client"
import { useTheme } from "@/components/themeContext"
import { getStyles } from "@/styles/styles"


export default function Sports() {
    const [loading, setLoading] = useState(true)
    const [sportsNews, setSportsNews] = useState([])
    const [liveStreams, setLiveStreams] = useState([])
    const [authors, setAuthors] = useState([])
    const { theme, toggleTheme } = useTheme()
            
    const styles = getStyles(theme)

    const screenWidth = Dimensions.get("window").width;
    const isSmallDevice = screenWidth < 600;

    useEffect(() => {
        getSportaZinas();
    }, [])

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
            .range(0,2)

        if (error) console.log(error.message)

        setSportsNews(Sporta_zinas)
        getAuthors()
        getTiesraides()
    };

    const getTiesraides = async () => {
        let { data, error } = await supabase
            .from('Tiesraide')
            .select('*')
            .range(0,5)

        if (error) console.log(error.message)

        setLiveStreams(data)
        setLoading(false)
    }

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
            <Text style={styles.headerText}>Sporta ziņas</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {!loading &&
                <FlatList
                    key={`numColumns-${isSmallDevice ? 1 : Math.floor(screenWidth / 590)}`} 
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
