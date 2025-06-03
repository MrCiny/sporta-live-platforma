import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase-client";
import { getModalStyles } from "@/styles/styles";
import { useTheme } from "@/components/themeContext";
import { Picker } from "@react-native-picker/picker";
import { getImage, handleGallery, handleImageUpload } from "@/components/handleGallery";

export default function NewsModal(props) {
  const {
    visible, 
    news, 
    onClose, 
    onFinish
  } = props

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [sport, setSport] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const { theme } = useTheme();
  const modalStyles = getModalStyles(theme);

  useEffect(() => {
    if (news) {
      setImage(news.image)
      setTitle(news.title)
      setSport(news.sport)
      setAuthor(news.author)
      setDescription(news.description)
    } else {
      setImage("")
      setTitle("")
      setSport("")
      setAuthor("")
      setDescription("")
    }
  }, [news]);

  const handleSave = async () => {
    let imageUri = await handleImageUpload("thumbnail", image);
    let finalImage = await getImage("thumbnail", imageUri)
    const zinasPayload = { title, description, image: finalImage, author, published:  new Date().toLocaleDateString()};

    try {
      if (news) {
        await supabase.from("Sporta_zinas").update(zinasPayload).eq("id", news.id);
      } else {
        const { data: speleInfo, error} = await supabase.from("Sporta_zinas").insert(zinasPayload).select();
      }
      global.refreshSectionTabs?.()
      onFinish();
      onClose();
    } catch (error) {
      console.error("Error saving game:", error);
    }

    onClose();
  };

  const handleImageChoose = async () => {
    let imageUri = await handleGallery();
    if (await imageUri) {
      setImage(imageUri ?? "");
    }
  }

  const getKomandas = async () => {
    const {data: komanda, error } = await supabase.from("Komanda").select('id,nosaukums').eq('sport', stream?.sport)
    if (error)
      console.log(error.message)
    else
      setKomandas(komanda)
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
            <Text style={modalStyles.title}>{game ? "Edit game" : "Create game"}</Text>
            <View style={modalStyles.card}>
              <TouchableOpacity style={{position: "static"}} onPress={() => handleImageChoose()}>
                <View>
                  <Image source={{ uri: image }} resizeMode="contain" style={modalStyles.imageContainer}/>
                </View>
              </TouchableOpacity>
              <View style={{ marginLeft: 20, position: "static"}}>
                <Text style={[modalStyles.title, { fontSize: 14, marginBottom: 0}]}>Title: </Text>
                <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={modalStyles.input} />
                <Text style={[modalStyles.title, { fontSize: 14, marginBottom: 0}]}>Komanda 1: </Text>
                <Picker
                  style={modalStyles.input}
                  selectedValue={komanda1}
                  onValueChange={(itemValue, itemIndex) =>
                    setKomanda1(itemValue)
                  }
                >
                  {komandas.map((item) => (
                    <Picker.Item key={item.id} label={item.nosaukums} value={item.id} />
                  ))}
                </Picker>
                {/*<TextInput placeholder="Komanda 1" value={komanda1} onChangeText={setKomanda1} style={modalStyles.input} />*/}
                <Text style={[modalStyles.title, { fontSize: 14, marginBottom: 0}]}>Komanda 2: </Text>
                {/*<TextInput placeholder="Komanda 2" value={komanda2} onChangeText={setKomanda2} style={modalStyles.input} />*/}
                <Picker
                  style={modalStyles.input}
                  selectedValue={komanda2}
                  onValueChange={(itemValue, itemIndex) =>
                    setKomanda2(itemValue)
                  }
                >
                  {komandas.map((item) => (
                    <Picker.Item key={item.id} label={item.nosaukums} value={item.id} />
                  ))}
                </Picker>
                <Text style={[modalStyles.title, { fontSize: 14, marginBottom: 0}]}>Vieta: </Text>
                <TextInput placeholder="Vieta" value={vieta} onChangeText={setVieta} style={modalStyles.input} />
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