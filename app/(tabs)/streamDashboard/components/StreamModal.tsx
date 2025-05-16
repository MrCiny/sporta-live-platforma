import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Switch, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView } from "react-native";
import { supabase } from "@/lib/supabase-client";
import { Picker } from '@react-native-picker/picker';

type Livestream = {
  id: number;
  speles_id: number;
  stream_id: string;
  title: string;
  image: string;
  sport: "football" | "basketball" | "hockey" | "volleyball" | string; // enum-like
};

type Props = {
  visible: boolean;
  stream: Livestream | null;
  onClose: () => void;
};

export default function StreamModal({ visible, stream, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [spelesId, setSpelesId] = useState("");
  const [streamId, setStreamId] = useState("");
  const [sport, setSport] = useState<Livestream["sport"]>("football");

  useEffect(() => {
    if (stream) {
      setTitle(stream.title);
      setImage(stream.image);
      setSpelesId(stream.speles_id.toString());
      setSport(stream.sport);
      setStreamId(stream.stream_id)
    } else {
      setTitle("");
      setImage("");
      setSpelesId("");
      setSport("football");
      setStreamId("");
    }
  }, [stream]);

  const handleSave = async () => {
    const payload = {
      title,
      image,
      sport,
      speles_id: parseInt(spelesId),
      stream_id: streamId
    };

    try {
      if (stream) {
        await supabase.from("Tiesraide").update(payload).eq("id", stream.id).select();
      } else {
          const response = await fetch('http://192.168.0.22:3000/create-livestream', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          const muxStream = await response.json();
        
          const insertPayload = {
            ...payload,
            stream_id: muxStream.playback_ids[0].id
          }
  
          await supabase.from("Tiesraide").insert(insertPayload).select();
      }
    }
    catch (error) {
      console.error('Error creating live stream:', error);
    }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.dialogContainer}>
          <View style={styles.dialog}>
          <Text style={styles.title}>{stream ? "Edit Livestream" : "Create Livestream"}</Text>

          <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
          <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={styles.input} />
          <TextInput placeholder="Spēles ID" value={spelesId} onChangeText={setSpelesId} keyboardType="numeric" style={styles.input} />

          <Text style={{ marginTop: 12 }}>Sport</Text>
          <Picker
            selectedValue={sport}
            onValueChange={(value) => setSport(value)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Futbols" value="football" />
            <Picker.Item label="Basketbols" value="basketball" />
            <Picker.Item label="Hokejs" value="hockey" />
            <Picker.Item label="Volejbols" value="volleyball" />
          </Picker>

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="gray" />
            <Button title="Save" onPress={handleSave} />
          </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    width: "90%",
  },
  dialog: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 12,
    paddingVertical: 6,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
