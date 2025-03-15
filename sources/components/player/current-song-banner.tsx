import { usePalette } from "@/themes"
import { View } from "react-native"
import { FlexView } from "../flex-view";
import { usePlayer } from "@/stores";
import { IconButton } from "../buttons";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "../themed-text";
import { trimFilename } from "@/utils/trim-filename";

export const CurrentSongBanner = () => {
  const palette = usePalette();
  const { isPlaying, next, stop, prev, toggle, currentSong } = usePlayer()

  if (!currentSong) {
    return null;
  }
  const trimedFilename = trimFilename(currentSong.filename);

  return (
    <View
      style={{
        height: 120,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: palette.background
      }}
    >
      <ThemedText style={{ textAlign: "center", fontSize: 16, marginBottom: 10 }}>
        {trimedFilename + (trimedFilename.length !== currentSong.filename.length ? "..." : "")}
      </ThemedText>
      <FlexView style={{ gap: 20, backgroundColor: palette.background }}>
        <IconButton onPress={prev}>
          <Feather style={{ fontSize: 40, color: palette.secondary }} name="skip-back" />
        </IconButton>
        <IconButton onPress={stop}>
          <Feather name="stop-circle" style={{ fontSize: 40, color: palette.secondary }} />
        </IconButton>
        <IconButton onPress={toggle}>
          {isPlaying ?
            <Feather name="pause" style={{ fontSize: 40, color: palette.secondary }} />
            : <Feather style={{ fontSize: 40, color: palette.secondary }} name="play" />}
        </IconButton>
        <IconButton onPress={next}>
          <Feather style={{ fontSize: 40, color: palette.secondary }} name="skip-forward" />
        </IconButton>
      </FlexView>
    </View>
  )
}
