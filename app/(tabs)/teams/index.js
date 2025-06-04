import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase-client";
import { useTheme } from "@/components/themeContext";
import { getTeamStyles } from "@/styles/styles";

export default function TeamDetails() {
    const { id } = useLocalSearchParams();
    const [team, setTeam] = useState(null);
    const [liveStreams, setLiveStreams] = useState([])
    const [loading, setLoading] = useState(true);
    const { theme, toggleTheme } = useTheme();
          
    const styles = getTeamStyles(theme);

  useEffect(() => {
    if (id) {
      fetchTeamInfo(id);
    }
  }, [id]);

  const fetchTeamInfo = async (teamId) => {
    const { data, error } = await supabase
      .from("Komanda")
      .select("*")
      .eq("id", teamId)
      .single();

    if (error) {
      console.error("Error loading team:", error.message);
    } else {
      setTeam(data);
    }

    
    const { data: info, error: errorNext } = await supabase
      .from("Speles_Info")
      .select("id")
      .or('komanda1.eq.' + teamId + ', komanda2.eq.' + teamId)
    
    const ids = info?.map(item => item.id) || [];

    const { data: tiesraides, error: next } = await supabase
        .from("Tiesraide")
        .select("*")
        .in('speles_id', ids)

    setLiveStreams(tiesraides)

    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#000968" />
      </SafeAreaView>
    );
  }

  if (!team) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Team not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {team.logo ? (
          <Image source={{ uri: team.logo }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>{team.nosaukums?.charAt(0) ?? "?"}</Text>
          </View>
        )}
        <Text style={styles.title}>{team.nosaukums}</Text>
        <Text style={styles.subTitle}>Sporta veids: {team.sport}</Text>
      </View>
      <Text style={styles.title}>Komandas sporta tiešraides</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveContainer}>
            {liveStreams.map((stream) => (
                <TouchableOpacity key={stream.id} style={styles.liveCard} onPress={() => router.push({ pathname: "/(tabs)/streams", params: { id: stream.speles_id } })}>
                    <Image source={{ uri: stream.image }} style={styles.liveImage} />
                    <Text style={styles.liveTitle}>{stream.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </SafeAreaView>
  );
}