import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase-client";
import { getModalStyles } from "@/styles/styles";
import { useTheme } from "@/components/themeContext";
import { Picker } from "@react-native-picker/picker";
import { getImage, handleGallery, handleImageUpload } from "@/components/handleGallery";
import { DatePickerModal } from 'react-native-paper-dates';

export default function GameModal(props) {
  const {
    visible, 
    game, 
    stream, 
    onClose, 
    onFinish
  } = props
  const [komanda1, setKomanda1] = useState(1);
  const [komanda2, setKomanda2] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [vieta, setVieta] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [sport, setSport] = useState("football");
  const [komandas, setKomandas] = useState([])
  const [showDate, setShowDate] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const { theme } = useTheme();
  const modalStyles = getModalStyles(theme);

  useEffect(() => {
    if (game && stream) {
      setKomanda1(game.komanda1);
      setKomanda2(game.komanda2);
      setDate(new Date(Date.parse(game.date)));
      setTime(game.laiks)
      setVieta(game.vieta);
      setImage(stream.image);
      setTitle(stream.title);
      setSport(stream.sport);
      getKomandas(stream.sport);
    }
    else {
      setKomanda1(1);
      setKomanda2(1);
      setDate(new Date());
      setTime(new Date())
      setVieta("");
      setImage("");
      setTitle("");
      setSport("football");
      getKomandas("football")
    }
  }, [game, stream]);

  const handleSave = async () => {
    let imageUri = await handleImageUpload("thumbnail", image);
    let finalImage = await getImage("thumbnail", imageUri)
    const gamePayload = { komanda1, komanda2, vieta };
    const streamPayload = { title, image: finalImage, speles_id: game?.id, sport };

    try {
      if (game && stream) {
        await supabase.from("Speles_Info").update(gamePayload).eq("id", game.id);
        await supabase.from("Tiesraide").update(streamPayload).eq("id", stream.id).select();
      } else {
        const { data: speleInfo, error} = await supabase.from("Speles_Info").insert(gamePayload).select();
        const response = await fetch('https://3a90-92-49-27-59.ngrok-free.app/create-livestream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const muxStream = await response.json();
      
        const insertPayload = {
          ...streamPayload,
          speles_id: speleInfo ? speleInfo[0].id : 0,
          stream_key: muxStream.stream_key,
          stream_id: muxStream.id, 
          stream_playback: muxStream.playback_ids[0].id
        }

        await supabase.from("Tiesraide").insert(insertPayload).select();
        
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

  const getKomandas = async (itemValue) => {
    const {data: komanda, error } = await supabase.from("Komanda").select('id,nosaukums').eq('sport', itemValue)
    if (error)
      console.log(error.message)
    else
      setKomandas(komanda)
  }

  const getAllKomandas = async () => {
    const {data: komanda, error } = await supabase.from("Komanda").select('id,nosaukums')
    if (error)
      console.log(error.message)
    else
      setKomandas(komanda)
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                <Text style={[modalStyles.title, { fontSize: 14, marginBottom: 0}]}>Komanda 2: </Text>
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
                  onValueChange={(itemValue, itemIndex) =>{
                      setSport(itemValue)
                      getKomandas(itemValue)
                    }
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
      </ScrollView>
    </Modal>
  );
}