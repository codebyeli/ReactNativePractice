import AddButton from "@/components/addButton";
import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Button, Text, useColorScheme, View } from "react-native";
import { useRouter } from 'expo-router'

type Note = {
  id: number
  title: string
  content: string
  isCompleted: boolean
}

export default function Index() {

  const colorScheme = useColorScheme() ?? 'light'
  const theme = Colors[colorScheme]
  const router = useRouter()

  const handleAddNote = () => {
    router.push('/createNote')
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header />
      <AddButton onPress={handleAddNote}/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})
