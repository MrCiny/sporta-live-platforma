import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    if (Platform.OS === 'web')
      return AsyncStorage.getItem(key)
    else
      return SecureStore.getItemAsync(key)
  },
  setItem: (key, value) => {
    if (Platform.OS === 'web')
      AsyncStorage.setItem(key, value)
    else
      SecureStore.setItemAsync(key, value)
  },
  removeItem: (key) => {
    if (Platform.OS === 'web')
      AsyncStorage.removeItem(key)
    else
      SecureStore.deleteItemAsync(key)
  },
}

const supabaseUrl = "https://cawhdclolaohecmobpeh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhd2hkY2xvbGFvaGVjbW9icGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDIwNTcsImV4cCI6MjA1NTM3ODA1N30.W1Z3ZHKcbB_jqE8uGQMb3CJ6pIedXkpc9EySHtclXsk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true
  },
})