import AddButton from "@/components/addButton";
import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import { StyleSheet, useColorScheme, View, Pressable, FlatList } from "react-native";
import { useRouter } from 'expo-router'
import { Trash, Pencil } from "lucide-react-native";
import { useNote } from "@/context/NoteContext";
import ThemedText from "@/components/themedText";
import { Checkbox } from 'expo-checkbox';


export default function Index() {

  const colorScheme = useColorScheme() ?? 'light'
  const theme = Colors[colorScheme]
  const router = useRouter()
  const { notes, deleteNote, updateNote } = useNote()

  const handleAddNote = () => {
    router.push('/createNote')
  }

    const handleEditNote = (id:string) => {
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
          <View style={[styles.noteContainer, { backgroundColor: theme.foreground }]}>
            <View style={styles.checkWrapper}>
              <Checkbox 
                value={item.isCompleted} 
                onValueChange={() => toggleCompleteOnTask(item.id, item)}
                color={item.isCompleted ? theme.background : '#ccc'}
              />
            </View>
            <View style={styles.noteBody}>
              <View style={styles.noteHeaders}>
                <ThemedText scheme='header' type='ui'>{item.title}</ThemedText>
              </View>
              <ThemedText scheme='subheader' type='ui'>{item.content}</ThemedText>
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={styles.deleteButton}
                  onPress={() => handleEditNote(item.id) }
                >
                  <Pencil color={theme.uitext} size={40} />
                </Pressable>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteNote(item.id)}
                >
                  <Trash color={theme.uitext} size={40} />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
      <AddButton onPress={handleAddNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  noteContainer: {
    width: "98%",
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 15,
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
