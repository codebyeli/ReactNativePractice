import { Colors } from "@/constants/Colors";
import { NoteProvider } from "@/context/NoteContext";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
      const colorScheme = useColorScheme() ?? 'light'
      const theme = Colors[colorScheme]
  return (
    <SafeAreaProvider style={{paddingVertical: 35, backgroundColor: theme.background}}>
      <NoteProvider>
        <Stack screenOptions={{ headerShown: false }} />;
      </NoteProvider>
    </SafeAreaProvider>
  );
}
