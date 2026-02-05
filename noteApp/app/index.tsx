import AddButton from "@/components/addButton";
import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import { StyleSheet, useColorScheme, View, Pressable, FlatList, Modal, Button } from "react-native";
import { useRouter } from 'expo-router'
import { Trash, Pencil } from "lucide-react-native";
import { useNote } from "@/context/NoteContext";
import ThemedText from "@/components/themedText";
import { Checkbox } from 'expo-checkbox';
import { useState } from "react";
import ThemedModal from "@/components/themedModal";


export default function Index() {

  const colorScheme = useColorScheme() ?? 'light'
  const theme = Colors[colorScheme]
  const router = useRouter()
  const { notes, deleteNote, updateNote } = useNote()
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)

  const handleNoteDeletion = () => {
    if (!noteToDelete) return

    deleteNote(noteToDelete)
    setNoteToDelete(null)
    setConfirmationModal(false)
  }

  const handleAddNote = () => {
    router.push('/createNote')
  }

  const handleEditNote = (id: string) => {
    router.push(`/edit/${id}`)
  }

  function toggleCompleteOnTask(id: string, data: any) {
    updateNote(id, {
      isCompleted: !data.isCompleted,
    })
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header />
      <FlatList
        data={notes}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 140 }}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={ item.isCompleted === true ? [styles.noteContainer, { backgroundColor: theme.uibackground }] : [styles.noteContainer, { backgroundColor: theme.foreground,  }] }>
            <View style={styles.checkWrapper}>
              <Checkbox
                value={item.isCompleted}
                onValueChange={() => toggleCompleteOnTask(item.id, item)}
                color={item.isCompleted ? theme.background : '#ccc'}
              />
            </View>
            <View style={styles.noteBody}>
              <View style={styles.noteHeaders}>
                <ThemedText scheme='header' type='ui' style={ item.isCompleted === true ? {textDecorationLine: 'line-through'} : {}}>{item.title}</ThemedText>
              </View>
              <ThemedText scheme='subheader' type='ui' style={ item.isCompleted === true ? {textDecorationLine: 'line-through'} : {}}>{item.content}</ThemedText>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleEditNote(item.id)}
                >
                  <Pencil color={theme.uitext} size={40} />
                </Pressable>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    setNoteToDelete(item.id)
                    setConfirmationModal(true)
                  }}
                >
                  <Trash color={theme.uitext} size={40} />
                </Pressable>

              </View>
            </View>
          </View>
        )}
      />
      <AddButton onPress={handleAddNote} />
      <ThemedModal
        visible={confirmationModal}
        title="Delete item?"
        description="This action cannot be undone."
        onConfirm={handleNoteDeletion}
        onCancel={() => {
          setNoteToDelete(null)
          setConfirmationModal(false)
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  noteContainer: {
    width: "87%",
    padding: 15,
    marginVertical: 6,
    borderRadius: 15,
    marginHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  noteHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  checkWrapper: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  noteBody: {
    flex: 1,
  },
  list: {
    marginTop: 10,
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
    alignSelf: "flex-end",
    marginHorizontal: 10,

  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
})
