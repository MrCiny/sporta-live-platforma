import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { supabase } from '@/lib/supabase-client';
import { useTheme } from '@/components/themeContext';
import { getDashboardStyles, getStyles } from '@/styles/styles';
import MainHeader from '@/components/mainHeader';
import GameModal from './components/GameModal';

export default function GameDashboard() {
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [form, setForm] = useState({
    komanda1: 0,
    komanda2: 0,
    date: '',
    laiks: '',
    rezultats: '',
    title: '',
    image: '',
    stream_id: '',
    stream_key: '',
    sport: ''
  });

  const { theme } = useTheme();
  const styles = getStyles(theme);
  const dashboardStyles = getDashboardStyles(theme);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    fetchGames();
    fetchTeams();
  }

  const fetchGames = async () => {
    const { data } = await supabase
      .from('Speles_Info')
      .select('*, Tiesraide(*)');
    setGames(data || []);
  };

  const fetchTeams = async () => {
    const { data } = await supabase.from('Komanda').select('*');
    setTeams(data || []);
  };

  const openModal = (game = null) => {
    if (game) {
      setSelectedGame(game);
      setForm({
        komanda1: game.komanda1,
        komanda2: game.komanda2,
        date: game.date,
        laiks: game.laiks,
        rezultats: game.rezultats,
        title: game.Tiesraide[0]?.title || '',
        image: game.Tiesraide[0]?.image || '',
        stream_id: game.Tiesraide[0]?.stream_id || '',
        stream_key: game.Tiesraide[0]?.stream_key || '',
        sport: game.Tiesraide[0]?.sport || ''
      });
    } else {
      setSelectedGame(null);
      setForm({ komanda1: 0, komanda2: 0, date: '', laiks: '', rezultats: '', title: '', image: '', stream_id: '', stream_key: '', sport: '' });
    }
    setModalVisible(true);
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
      <MainHeader />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={dashboardStyles.headerRow}>
          <Text style={styles.headerText}>Game Dashboard</Text>
          <TouchableOpacity onPress={() => { setSelectedGame(null); setModalVisible(true); }} style={dashboardStyles.addButton}>
              <Text style={dashboardStyles.addButtonText}>+ Create</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGameItem}
        />
        <GameModal
          visible={modalVisible}
          game={selectedGame}
          stream={selectedGame?.Tiesraide[0]}
          onClose={() => setModalVisible(false)}
          onFinish={() => refreshData()}
        />
      </ScrollView>

    </SafeAreaView>
  );
}  
