import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { supabase } from '@/lib/supabase-client'
import { Button, Input, Icon } from '@rneui/themed'
import { Text } from 'react-native-elements';
import { router } from 'expo-router';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', error: false })

  function showSnackbar(message, isError = false) {
    setSnackbar({ visible: true, message, error: isError })
  }

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) showSnackbar(error.message, true)
      setLoading(false)
  }

  const signUpWithEmail = async () => {
    setLoading(true)
    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      data: {
        name: email,
        avatar_url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 
        username: email, 
      }
    })

    if(data.user)
      await supabase.from("Users").insert({username: email, email: email, user_id: data.user.id })

    if (error) showSnackbar(error.message, true)
    if (!data.session) Alert.alert('Please check your inbox for email verification!')
      setLoading(false)

    if(data.session)
      router
  }

  const signInWithGitHub = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })

    if (error) showSnackbar(error.message, true)
      setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Input
          label="Email"
          placeholder="email@address.com"
          autoCapitalize="none"
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#999' }}
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          autoCapitalize="none"
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#999' }}
          value={password}
          onChangeText={setPassword}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
        />
        <Button
          title="Sign In"
          loading={loading}
          onPress={signInWithEmail}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="Sign Up"
          type="outline"
          onPress={signUpWithEmail}
          disabled={loading}
          titleStyle={{ color: '#555' }}
          buttonStyle={styles.outlineButton}
          containerStyle={styles.buttonContainer}
        />
        {Platform.OS === "web" && (
          <Button
            title="Continue with GitHub"
            icon={<Icon name="github" type="font-awesome" color="#fff" />}
            iconRight
            onPress={signInWithGitHub}
            disabled={loading}
            buttonStyle={styles.githubButton}
            containerStyle={styles.buttonContainer}
          />
        )}
        {snackbar.error && (
          <Text style={{color: "red"}}>
            {snackbar.message}
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputText: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  outlineButton: {
    borderColor: '#ccc',
    borderRadius: 10,
  },
  githubButton: {
    backgroundColor: '#333',
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
})