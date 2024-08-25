import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {manipulateAsync, FlipType, SaveFormat} from "expo-image-manipulator";

export default function App() {

  const pickImageFromLibrary = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const manipResult = await manipulateAsync(
          uri,
          [{ rotate: 90 }, { flip: FlipType.Vertical }],
          { compress: 1, format: SaveFormat.PNG }
      );
      return manipResult.uri;
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImageFromLibrary}>
        <Text>Choose an image from library</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
