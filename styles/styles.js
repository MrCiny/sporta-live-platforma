import { StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "./theme";
import { color } from "react-native-elements/dist/helpers";

export const getStyles = (theme) => {
    const colors = theme === "dark" ? darkTheme : lightTheme;
    
    return StyleSheet.create({
        headerContainer: {
            borderBottomWidth: 0, 
            shadowColor: colors.shadowColor,
            backgroundColor: colors.header
        },
        avatar: {
            borderWidth: 2,
            borderColor: "#fff",
        },
        safeArea: { 
            flex: 1, 
            backgroundColor: 
            colors.safeArea 
        },
        headerTextContainer: { 
            width: "100%", 
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 10
        },
        contentContainer: { 
            paddingTop: 20, 
            paddingHorizontal: 10, 
            backgroundColor: 
            colors.safeArea
        },
        listHeader: { marginBottom: 10 },
        headerText: { 
            fontSize: 22, 
            fontWeight: "bold", 
            marginBottom: 10, 
            color: colors.text 
        },
        liveContainer: { 
            flexDirection: "row", 
            marginBottom: 20 
        },
        liveCard: { 
            width: 320, 
            borderRadius: 10, 
            overflow: "hidden", 
            marginRight: 10, 
            backgroundColor: colors.liveCard, 
            padding: 10 
        },
        liveImage: { 
            width: "100%", 
            height: 170, 
            borderRadius: 10 
        },
        liveTitle: { 
            fontSize: 16, 
            fontWeight: "bold", 
            textAlign: "center", 
            padding: 5, 
            color: colors.text 
        },
        newsCard: { 
            marginBottom: 20, 
            borderRadius: 10, 
            backgroundColor: colors.newsCard, 
            overflow: "hidden", 
            padding: 10, 
            shadowColor: colors.shadowColor, 
            shadowOpacity: 0.1, 
            shadowRadius: 5, 
            elevation: 3 
        },
        newsHeader: { 
            flexDirection: "row", 
            alignItems: "center", 
            marginBottom: 10 
        },
        authorAvatar: { 
            width: 40, 
            height: 40, 
            borderRadius: 20, 
            backgroundColor: "#6200ea", 
            justifyContent: "center", 
            alignItems: "center", 
            marginRight: 10, 
            olor: colors.text
        },
        avatarText: { 
            color: "#fff", 
            fontSize: 18, 
            fontWeight: "bold" 
        },
        newsAuthor: { 
            fontSize: 16, 
            fontWeight: "bold", 
            color: colors.text 
        },
        newsSubtitle: { 
            fontSize: 14, 
            color: colors.subtitle 
        },
        newsImage: { 
            width: "100%", 
            height: 150, 
            borderRadius: 10 
        },
        newsTitle: { 
            fontSize: 16, 
            fontWeight: "bold", 
            marginTop: 5, 
            color: colors.text 
        },
        tabBarStyle: {
            backgroundColor: colors.background,
            borderColor: colors.background
        },
        container: {
            marginTop: 40,
            padding: 12,
        },
        verticallySpaced: {
            paddingTop: 4,
            paddingBottom: 4,
            alignSelf: "stretch",
        },
        mt20: {
            marginTop: 20,
        },
        buttonContainer: {
            backgroundColor: "#000968",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12,
            margin: 8,
        },
        buttonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase",
        },
        textInput: {
            borderColor: "#000968",
            borderRadius: 4,
            borderStyle: "solid",
            borderWidth: 1,
            padding: 12,
            margin: 8,
        },
        scrollContainer: {
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
        },
        profileContainer: {
            alignItems: "center",
            padding: 20,
            backgroundColor: colors.background,
            borderRadius: 15,
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            width: "90%",
        },
        profileImage: {
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 12,
            borderWidth: 3,
            borderColor: "#fff",
        },
        nameText: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors.nameText,
            marginBottom: 4,
        },
        usernameText: {
            fontSize: 18,
            fontWeight: "500",
            color: colors.userNameText,
            marginBottom: 8,
        },
        emailText: {
            fontSize: 16,
            color: colors.emailText,
            marginBottom: 10,
        },
        joinDateText: {
            fontSize: 14,
            color: colors.joinDateText,
            fontStyle: "italic",
        },
        crollContainer: {
            flexGrow: 1,
            backgroundColor: colors.liveCard,
            paddingBottom: 20,
        },
        newsContainer: {
            backgroundColor: colors.background,
            margin: 20,
            borderRadius: 12,
            padding: 20,
            shadowColor: colors.shadowColor,
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
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.2)",
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 15,
            textAlign: "center",
            color: colors.text
        },
        author: {
            fontSize: 16,
            color: "gray",
            marginTop: 5,
            textAlign: "center",
        },
        date: {
            fontSize: 14,
            color: colors.userNameText,
            fontStyle: "italic",
            marginTop: 3,
            textAlign: "center",
        },
        description: {
            fontSize: 18,
            marginTop: 15,
            lineHeight: 26,
            textAlign: "justify",
            color: colors.text
        },
        streamContainer: {
            flex: 1, 
            backgroundColor: 
            colors.safeArea,
            padding: 15
        },
        videoContainer: { width: "100%", height: 200, backgroundColor: "black", marginBottom: 10 },
        video: { width: "100%", height: 200 },
        banner: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10 },
        teamLogo: { width: 80, height: 80, marginHorizontal: 5 },
        vsText: { fontSize: 24, fontWeight: "bold", color: colors.text },
        matchInfo: { textAlign: "center", fontSize: 14, color: "white", backgroundColor: colors.header, padding: 5, borderRadius: 5 },
        scoreContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 },
        teamName: { fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1, color: colors.text },
        score: { fontSize: 32, fontWeight: "bold", textAlign: "center", flex: 1, color: colors.text },
        streamButtonContainer: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
        streamButton: { backgroundColor: "#dcdcdc", padding: 10, borderRadius: 5, marginHorizontal: 5 },
        darkButton: { backgroundColor: "#333" },
        darkButtonText: { color: "white", fontWeight: "bold" },
        streamButtonText: { color: "black", fontWeight: "bold" },
        eventsContainer: { marginTop: 15 },
        eventCard: { backgroundColor: colors.eventCard, padding: 10, borderRadius: 5, marginBottom: 10 },
        eventText: { fontSize: 16, fontWeight: "bold", color: colors.text},
        eventDetails: { fontSize: 14, color: colors.subtitle, marginTop: 5 },
        input: { color: colors.text, textAlign: "center"}
    });
};
