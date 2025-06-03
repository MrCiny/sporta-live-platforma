import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { supabase } from '@/lib/supabase-client'
import { useTheme } from '@/components/themeContext'
import { getDashboardStyles, getStyles } from '@/styles/styles'
import { Image } from '@rneui/themed'
import { router } from 'expo-router'

export default function NewsDashboard() {
  const [newsList, setNewsList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)

  const { theme } = useTheme()
  const styles = getStyles(theme)
  const dashboardStyles = getDashboardStyles(theme)

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

    if (data?.role !== "Admin" && data?.role !== "Author") {
      router.navigate("/(tabs)/sports/")
      return
    }

    fetchNews(data)
  }

  const fetchNews = async (author) => {
    if (author.role === "Author") {
      const { data } = await supabase.from('Sporta_zinas').select('*').eq('author_id', author.id).order('published', { ascending: false })
      setNewsList(data || [])
    }
    else {
      const { data } = await supabase.from('Sporta_zinas').select('*').order('published', { ascending: false })
      setNewsList(data || [])
    }
  };

  const openModal = (news = null) => {
    if (news) 
      setSelectedNews(news);
    else 
      setSelectedNews(null);
    
    setModalVisible(true);
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={dashboardStyles.card}>
      <Image source={{ uri: item.image }} style={dashboardStyles.thumbnail} />
      <Text style={dashboardStyles.title}>{item.title}</Text>
      <Text style={dashboardStyles.subtitle}>{item.date}</Text>
      <Text style={[dashboardStyles.subtitle, { marginLeft: 10 }]}>📅 Published: {item.published}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={dashboardStyles.headerRow}>
          <Text style={styles.headerText}>News Dashboard</Text>
          <TouchableOpacity onPress={() => openModal()} style={dashboardStyles.addButton}>
              <Text style={dashboardStyles.addButtonText}>+ Create</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={newsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNewsItem}
        />
      </ScrollView>

    </SafeAreaView>
  );
}
