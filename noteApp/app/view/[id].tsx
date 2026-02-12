import { StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import ThemedButton from "@/components/themedButton";
import { useNote } from "@/context/NoteContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import ThemedText from "@/components/themedText";

const ViewNote = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getNoteById } = useNote();
  const notes = getNoteById(id);
  const router = useRouter();

  return (
    <>
      {notes ? (
        <View style={[styles.root, { backgroundColor: theme.background }]}>
          <Header />
          <View style={styles.textBoxContainer}>
          <ThemedText scheme="header" style={styles.header}>{notes.title}</ThemedText>
          <ThemedText scheme="default"style={styles.content}>{notes.content}</ThemedText>
          <ThemedButton
            buttonText="Go back"
            onPress={() => router.back()}
          ></ThemedButton>{" "}
          </View>
        </View>
      ) : (
        <View style={styles.noteNotFound}>
          <ThemedText scheme="header" type="ui">
            Unable to locate a note to view
          </ThemedText>
          <ThemedButton
            buttonText="Go back"
            onPress={() => router.back()}
          ></ThemedButton>{" "}
        </View>
      )}
    </>
  );
};

export default ViewNote;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  textBoxContainer: {
    padding: 15
  },
    header: {
    paddingBottom: 25
  },
      content: {
    paddingBottom: 35
  },
  noteNotFound: {
    justifyContent: "center",
    alignItems: "center",
  },
});
