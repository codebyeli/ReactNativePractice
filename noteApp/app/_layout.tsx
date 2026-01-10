import { NoteProvider } from "@/context/NoteContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <NoteProvider>
      <Stack screenOptions={{ headerShown: false }} />;
    </NoteProvider>
  )
}
