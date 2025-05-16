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

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true
  },
})