import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MainHeader from "../../../components/mainHeader";

const liveStreams = [
    { id: "1", title: "Tiešraide: VEF Rīga - Ventspils", thumbnail: "https://video.tiesraides.lv/735x413/posters-pro/latest.lv_34_1734909774.jpg" },
    { id: "2", title: "", thumbnail: "" },
    { id: "3", title: "", thumbnail: "" },
];

const sportsNews = [
    { id: "1", title: "Latvijas klasikā VEF un Ventspils noskaidros pēdējo pusfinālisti", image: "https://i8.tiesraides.lv/800x600s/pictures/2025-03-30/9bb3_michael_randolph_bk_ventspils.jpg", author: "Agris Suveizda" },
    { id: "2", title: "Porziņģim labs sākums un daudz piezīmju, Bostonai astotā uzvara pēc kārtas", image: "https://i6.tiesraides.lv/370x208/pictures/2025-03-30/6930_kristaps_porzingis_boston_ce.jpg", author: "Agris Suveizda" },
    { id: "3", title: "Fenomenālā Peidža Bekersa gāž rekordus un ieved UConn apgabala finālā", image: "https://i0.tiesraides.lv/800x600s/pictures/2025-03-30/0116_paige_bueckers_cheers.jpg", author: "Māris Noviks" },
];

export default function Basketball() {
    const navigation = useNavigation();

    const renderLiveStreams = () => (
        <>
            <Text style={styles.header}>Basketbola tiešraides tev</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveContainer}>
                {liveStreams.map((stream) => (
                    <View key={stream.id} style={styles.liveCard}>
                        <Image source={{ uri: stream.thumbnail }} style={styles.liveImage} />
                        <Text style={styles.liveTitle}>{stream.title}</Text>
                    </View>
                ))}
            </ScrollView>
        </>
    );

    const renderNewsItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("news", { news: item })}>
                <View style={styles.newsCard}>
                    <View style={styles.newsHeader}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{item.author.charAt(0)}</Text> 
                        </View>
                        <View>
                            <Text style={styles.newsAuthor}>{item.author}</Text>
                            <Text style={styles.newsSubtitle}>{item.title}</Text>
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
            <Text style={styles.header}>Basketbola ziņas</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <MainHeader />
            </View>
            <FlatList
                data={sportsNews}
                keyExtractor={(item) => item.id}
                renderItem={renderNewsItem}
                ListHeaderComponent={renderListHeader}
                contentContainerStyle={styles.contentContainer}
            />
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
