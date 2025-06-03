import { supabase } from '@/lib/supabase-client';
import * as ImagePicker from 'expo-image-picker';

export async function handleGallery(title) {
    const options = {
        title,
        storageOptions: {
        skipBackup: true,
        path: 'images',
        },
    };

    let response = await ImagePicker.launchImageLibraryAsync(options);
    if (response) {
        if (response.canceled) {
        console.log('User cancelled image picker');
        return null;
        } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        return null;
        } else {
        return response.assets[0]?.uri;
        }
    }
}

export async function handleImageUpload(title, imageUri) {
    if (!imageUri) return

    const response = await fetch(imageUri)
    const blob = await response.blob()

    const fileName = `${Date.now()}.png`;
    
    const { data, error } = await supabase.storage
    .from(title)
    .upload(fileName, blob, { contentType: 'image/png' });

    if (error) {
        alert("Error uploading image", error.message);
        return imageUri;
    }
    
    return data?.path;
}


export async function getImage(title, imageUri) {
    const { data, error } = await supabase
        .storage
        .from(title)
        .getPublicUrl(imageUri);

    if (!error) {
        return data.publicUrl;
    }
    else {
        alert("Error while uploading picture", error)
        return imageUri;
    }
}