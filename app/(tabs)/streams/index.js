import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Video from "react-native-video";

export default function streams() {
    const [spelesGaita, setSpelesGaita] = useState(true);
    const gameData = {
        date: "08.02.2025",
        time: "13:00",
        round: "18. KĀRTA",
        team1: {
            name: "FK NĪCA",
            logo: "https://lff.lv/files/images_comet/Club/1/_resized/11924_1918211464_0_220_t.png",
        },
        team2: {
            name: "RIGA FC",
            logo: "https://lff.lv/files/images_comet/c5/3/_resized/c53b5c3709c8d44bf2422a97b247d0341da41749_0_220_t.png",
        },
        score: "4:3",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        events: [
            { minute: "6'", team: "FK NĪCA", player: "Mārcis Červoņikovs" },
            { minute: "15'", team: "RIGA FC", player: "Andžejs Mickēvičs" },
            { minute: "17'", team: "FK NĪCA", player: "Raivis Svilis" },
            { minute: "31'", team: "FK NĪCA", player: "Rihards Konovalovs" },
            { minute: "31'", team: "FK NĪCA", player: "Raivis Svilis" },
            { minute: "32'", team: "RIGA FC", player: "Daniils Fogels" },
            { minute: "33'", team: "RIGA FC", player: "Dzmitry Kuzmin" },
        ],
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    source={{ uri: gameData.videoUrl }}
                    style={styles.video}
                    controls={true}
                    resizeMode="contain"
                    paused={true}
                />
            </View>

            <Text style={styles.matchInfo}>{gameData.date} | {gameData.time} | {gameData.round}</Text>

            <View style={styles.scoreContainer}>
                <Text style={styles.teamName}>{gameData.team1.name}</Text>
                <Text style={styles.score}>{gameData.score}</Text>
                <Text style={styles.teamName}>{gameData.team2.name}</Text>
            </View>

            <View style={styles.banner}>
                <Image source={{ uri: gameData.team1.logo }} style={styles.teamLogo} />
                <Text style={styles.vsText}>VS</Text>
                <Image source={{ uri: gameData.team2.logo }} style={styles.teamLogo} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => setSpelesGaita(false)}>Spēles gaita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.darkButton]}>
                    <Text style={styles.darkButtonText}>Spēles protokols</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.eventsContainer}>
                {gameData.events.map((event, index) => (
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 15 },
    videoContainer: { width: "100%", height: 200, backgroundColor: "black", marginBottom: 10 },
    video: { width: "100%", height: "100%" },
    banner: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10 },
    teamLogo: { width: 80, height: 80, marginHorizontal: 5 },
    vsText: { fontSize: 24, fontWeight: "bold" },
    matchInfo: { textAlign: "center", fontSize: 14, color: "white", backgroundColor: "red", padding: 5, borderRadius: 5 },
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