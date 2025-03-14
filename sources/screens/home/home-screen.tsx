
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";

import { Player, Playlist } from "@/components";

const getAudioFiles = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") return [];
  const media = await MediaLibrary.getAssetsAsync({ mediaType: "audio" });
  return media.assets;
};

export const HomeScreen = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const files = await getAudioFiles();
      setAudioFiles(files);
    };
    fetchAudioFiles();
  }, []);

  return (
    <View style={styles.container}>
      <Playlist audioFiles={audioFiles} onSelectAudio={setSelectedAudio} />
      {selectedAudio && <Player audioUri={selectedAudio} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
