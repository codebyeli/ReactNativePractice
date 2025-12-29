import Header from "@/components/header";
import ThemedTextBox from "@/components/themedTextBox";
import { Colors } from "@/constants/Colors";
import { useForm } from "react-hook-form";
import { StyleSheet, Button, Text, useColorScheme, View } from "react-native";

const colorScheme = useColorScheme() ?? 'light'
const theme = Colors[colorScheme]

export default function Index() {

  const {control, handleSubmit} = useForm()

type Note = {
  id: number
  title: string
  content: string
  isCompleted: boolean
}   

  return (
    <View style={styles.root}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
root: {
  flex: 1,
  backgroundColor: theme.background
}
})
