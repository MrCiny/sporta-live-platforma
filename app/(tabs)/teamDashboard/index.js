import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { supabase } from '@/lib/supabase-client'
import { useTheme } from '@/components/themeContext'
import { getStyles, getTeamDashboardStyles } from '@/styles/styles'
import { Image } from '@rneui/themed'
import { router } from 'expo-router'
import TeamModal from './components/TeamModal'

export default function TeamDashboard() {
  const [teamList, setTeamList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)

  const { theme } = useTheme()
  const styles = getStyles(theme)
  const dashboardStyles = getTeamDashboardStyles(theme)

  useEffect(() => {
    checkAccess()
  }, []);

  const checkAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.navigate("/(auth)/login")
      return
    }

    const { data, error } = await supabase
      .from("Users")
      .select("id,role")
      .eq("user_id", user.id)
      .single()

    if (data?.role !== "Admin") {
      router.navigate("/(tabs)/sports/")
      return
    }

    fetchTeams()
  }

  const refreshData = async () => {
    checkAccess()
  }

  const fetchTeams = async () => {
    const { data } = await supabase.from('Komanda').select('*').order('id', { ascending: false })
    setTeamList(data || [])
  };

  const openModal = (selectTeam = null) => {
    if (selectTeam) 
      setSelectedTeam(selectTeam);
    else 
      setSelectedTeam(null);
    
    setModalVisible(true);
  };

  const renderTeamItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={dashboardStyles.card}>
      <Image source={{ uri: item.logo }} style={dashboardStyles.thumbnail} />
      <View>
        <Text style={dashboardStyles.title}>{item.nosaukums}</Text>
        <Text style={[dashboardStyles.subtitle, { marginLeft: 10 }]}>🏆Sport: {item.sport}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={dashboardStyles.headerRow}>
        <Text style={styles.headerText}>Team Dashboard</Text>
        <TouchableOpacity onPress={() => openModal(null)} style={dashboardStyles.addButton}>
          <Text style={dashboardStyles.addButtonText}>+ Create</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        <FlatList
          data={teamList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTeamItem}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      <TeamModal
        visible={modalVisible}
        team={selectedTeam}
        onClose={() => setModalVisible(false)}
        onFinish={() => refreshData()}
      />
    </SafeAreaView>
  );
}
