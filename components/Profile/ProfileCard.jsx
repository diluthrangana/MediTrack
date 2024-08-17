import { View, Button, Image, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileCard() {
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    if (!galleryPermission) {
      console.log('Gallery permission not granted');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result); // Debugging: check result object

    if (!result.canceled && result.uri) {
      setImage(result.uri);
    } else {
      console.log('No image selected or an error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Pick an Image' onPress={pickImage} />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text>No image selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    resizeMode: 'cover', // Ensure the image fits well
    borderRadius: 10, // Optional: add some border radius
  },
});
