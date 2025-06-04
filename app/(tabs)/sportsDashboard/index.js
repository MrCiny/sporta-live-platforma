import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native'
import { supabase } from '@/lib/supabase-client'
import { useTheme } from '@/components/themeContext'
import { getDashboardStyles, getStyles } from '@/styles/styles'
import GameModal from './components/GameModal'
import { router } from 'expo-router'

export default function GameDashboard() {
  const [games, setGames] = useState([])
  const [teams, setTeams] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)

  const { theme } = useTheme()
  const styles = getStyles(theme)
  const dashboardStyles = getDashboardStyles(theme)

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.navigate("/(auth)/login")
      return
    }

    const { data, error } = await supabase
      .from("Users")
      .select("role")
      .eq("user_id", user.id)
      .single()

    if (data?.role !== "Admin") {
      router.navigate("/(tabs)/sports/")
      return
    }
    refreshData();
  }

  const refreshData = async () => {
    fetchGames()
    fetchTeams()
  }

  const fetchGames = async () => {
    const { data } = await supabase
      .from('Speles_Info')
      .select('*, Tiesraide(*)')
    setGames(data || []);
  };

  const fetchTeams = async () => {
    const { data } = await supabase.from('Komanda').select('*')
    setTeams(data || [])
  };

  const openModal = (tempGame = null) => {
    console.log(tempGame)
    if (tempGame) {
      setSelectedGame(tempGame)
    } else {
      setSelectedGame(null)
    }
    setModalVisible(true)
  };

  const renderGameItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={dashboardStyles.card}>
      <Image source={{ uri: item.Tiesraide[0].image }} style={dashboardStyles.thumbnail} />
      <Text style={dashboardStyles.title}>{item.Tiesraide ? item.Tiesraide[0].title : ''} </Text>
      <View style={{marginLeft: 15, marginTop: 10}}>
        <Text style={dashboardStyles.subtitle}>📅 Date: {item.date} {item.laiks}</Text>
        {item.Tiesraide && (
          <>
            <Text style={dashboardStyles.subtitle}>🔑 Stream Key: {item.Tiesraide[0].stream_key}</Text>
            <Text style={dashboardStyles.subtitle}>Sports: {item.Tiesraide[0].sport}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={dashboardStyles.headerRow}>
          <Text style={styles.headerText}>Game Dashboard</Text>
          <TouchableOpacity onPress={() => openModal(null) } style={dashboardStyles.addButton}>
              <Text style={dashboardStyles.addButtonText}>+ Create</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          <FlatList
            data={games}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGameItem}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
        <GameModal
          visible={modalVisible}
          game={selectedGame}
          stream={selectedGame?.Tiesraide[0]}
          onClose={() => setModalVisible(false)}
          onFinish={() => refreshData()}
        />
    </SafeAreaView>
  );
}  
