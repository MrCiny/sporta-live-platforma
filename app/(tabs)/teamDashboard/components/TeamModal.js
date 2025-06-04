import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase-client";
import { getModalStyles } from "@/styles/styles";
import { useTheme } from "@/components/themeContext";
import { Picker } from "@react-native-picker/picker";
import { getImage, handleGallery, handleImageUpload } from "@/components/handleGallery";

export default function TeamModal(props) {
  const {
    visible, 
    team, 
    onClose, 
    onFinish
  } = props

  const [logo, setLogo] = useState("");
  const [nosaukums, setNosaukums] = useState("");
  const [sport, setSport] = useState("");
  const { theme } = useTheme();
  const modalStyles = getModalStyles(theme);

  useEffect(() => {
    if (team) {
      setLogo(team.logo)
      setNosaukums(team.nosaukums)
      setSport(team.sport)
    } else {
      setLogo("")
      setNosaukums("")
      setSport("")
    }
  }, [team]);

  const handleSave = async () => {
    let imageUri = await handleImageUpload("logo", logo);
    let finalImage = await getImage("logo", imageUri)
    const teamPayload = { nosaukums, logo: finalImage, sport };

    try {
      if (team) {
        await supabase.from("Komanda").update(teamPayload).eq("id", team.id);
      }
      else {
        const { data, error} = await supabase.from("Komanda").insert(teamPayload).select();
        if (error) console.log(error)
      }

      global.refreshSectionTabs?.()
      onFinish();
      onClose();
    } catch (error) {
      console.error("Error saving komandas:", error);
    }
    onClose();
  };

  const handleImageChoose = async () => {
    let imageUri = await handleGallery();
    if (await imageUri) {
      setLogo(imageUri ?? "");
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={modalStyles.dialogContainer}>
          <View style={modalStyles.dialog}>
            <Text style={modalStyles.title}>{team ? "Edit team" : "Create team"}</Text>
            <View style={modalStyles.card}>
              <TouchableOpacity style={{position: "static"}} onPress={() => handleImageChoose()}>
                <View>
                  <Image source={{ uri: logo }} resizeMode="contain" style={modalStyles.imageContainer}/>
                </View>
              </TouchableOpacity>
              <View style={{ marginLeft: 20, position: "static"}}>
                <Text style={[modalStyles.title, { fontSize: 14, marginBottom: 0}]}>Nosaukums: </Text>
                <TextInput placeholder="Nosaukums" value={nosaukums} onChangeText={setNosaukums} style={modalStyles.input} />
                <Text style={[modalStyles.title, { fontSize: 14, marginBottom: 0}]}>Sports: </Text>
                <Picker
                  style={modalStyles.input}
                  selectedValue={sport}
                  onValueChange={(itemValue, itemIndex) =>
                    setSport(itemValue)
                  }
                >
                  <Picker.Item label={"Futbols"} value={"football"} />
                  <Picker.Item label={"Hokejs"} value={"hockey"} />
                  <Picker.Item label={"Volejbols"} value={"volleyball"} />
                  <Picker.Item label={"Basketbols"} value={"basketball"} />
                </Picker>
              </View>
            </View>

            <View style={modalStyles.buttonRow}>
              <Button title="Cancel" onPress={onClose} color="gray" />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
    </ScrollView>
  );
}