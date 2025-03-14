import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

interface PlaylistProps {
  audioFiles: any[];
  onSelectAudio: (uri: string) => void;
}

export const Playlist: React.FC<PlaylistProps> = ({ audioFiles, onSelectAudio }) => {
  return (
    <View style={styles.container}>
      <Text style={{color: "black"}}>Hello world Liste des chansons</Text>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelectAudio(item.uri)}>
            <Text style={styles.text}>{item.filename}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  text: {
    fontSize: 16,
  },
});
