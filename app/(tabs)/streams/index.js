import React, { useEffect, useState } from "react";
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Video from "react-native-video";
import MainHeader from "../../../components/mainHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../../lib/supabase-client";

export default function streams() {
    const info = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [spelesInfo, setSpelesInfo] = useState(null);
    const [komandasInfo, setKomandasInfo] = useState([]);
    const [spelesGaita, setSpelesGaita] = useState(false);

    useEffect(() => {
        async function getSpelesInfo() {
            setLoading(true);
            let { data, error } = await supabase
                .from('Speles_Info')
                .select('*')
                .eq('id', info.id)
    
                setSpelesInfo(data);
                getKomandasInfo(data);
        };

        async function getKomandasInfo(spele) {
            let { data, error } = await supabase
                .from('Komanda')
                .select('*')
                .in('id', [spele[0].komanda1, spele[0].komanda2])
            
                setKomandasInfo(data);
                setLoading(false);
        };

        getSpelesInfo();
    }, [info.id])

    const player = useVideoPlayer(loading ? "" : spelesInfo[0].tiesraides_URL, player => {
        player.loop = true;
      });

    return (
        <>
        <MainHeader />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
            {!loading &&
                <ScrollView style={styles.container}>
                    <View style={styles.videoContainer}>
                            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                    </View>

                    <Text style={styles.matchInfo}>{spelesInfo[0].date} | {spelesInfo[0].laiks}</Text>


                    <View style={styles.scoreContainer}>
                        <Text style={styles.teamName}>{komandasInfo[0].nosaukums}</Text>
                        <Text style={styles.score}>{spelesInfo[0].rezultats}</Text>
                        <Text style={styles.teamName}>{komandasInfo[1].nosaukums}</Text>
                    </View>

                    <View style={styles.banner}>
                        <Image source={{ uri: komandasInfo[0].logo }} style={styles.teamLogo} />
                        <Text style={styles.vsText}>VS</Text>
                        <Image source={{ uri: komandasInfo[1].logo }} style={styles.teamLogo} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText} onPress={() => setSpelesGaita(false)}>Spēles gaita</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.darkButton]}>
                            <Text style={styles.darkButtonText}>Spēles protokols</Text>
                        </TouchableOpacity>
                    </View>

                    {spelesInfo[0].events != null &&
                        <View style={styles.eventsContainer}>
                            {spelesInfo[0].events.map((event, index) => (
                                <View key={index} style={styles.eventCard}>
                                    <Text style={styles.eventText}>
                                        ({event.minute}) {event.team} VĀRTI!!!
                                    </Text>
                                    <Text style={styles.eventDetails}>
                                        Vārtus guva {event.team} spēlētājs {event.player}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    }
                </ScrollView>
            }
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 15 },
    videoContainer: { width: "100%", height: 200, backgroundColor: "black", marginBottom: 10 },
    video: { width: "100%", height: "100%" },
    banner: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10 },
    teamLogo: { width: 80, height: 80, marginHorizontal: 5 },
    vsText: { fontSize: 24, fontWeight: "bold" },
    matchInfo: { textAlign: "center", fontSize: 14, color: "white", backgroundColor: "#288cdc", padding: 5, borderRadius: 5 },
    scoreContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 },
    teamName: { fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 },
    score: { fontSize: 32, fontWeight: "bold", textAlign: "center", flex: 1 },
    buttonContainer: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
    button: { backgroundColor: "#dcdcdc", padding: 10, borderRadius: 5, marginHorizontal: 5 },
    darkButton: { backgroundColor: "#333" },
    darkButtonText: { color: "white", fontWeight: "bold" },
    buttonText: { color: "black", fontWeight: "bold" },
    eventsContainer: { marginTop: 15 },
    eventCard: { backgroundColor: "#f5f5f5", padding: 10, borderRadius: 5, marginBottom: 10 },
    eventText: { fontSize: 16, fontWeight: "bold" },
    eventDetails: { fontSize: 14, color: "gray", marginTop: 5 },
});