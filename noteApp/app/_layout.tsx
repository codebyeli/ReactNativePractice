import { NoteProvider } from "@/context/NoteContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{paddingVertical: 35}}>
      <NoteProvider>
        <Stack screenOptions={{ headerShown: false }} />;
      </NoteProvider>
    </SafeAreaProvider>
  );
}
