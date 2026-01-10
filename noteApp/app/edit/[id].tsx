import { StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedTextBox from '@/components/themedTextBox'
import Header from '@/components/header'
import { Colors } from '@/constants/Colors'
import { useForm } from 'react-hook-form'
import ThemedButton from '@/components/themedButton'
import { useNote } from '@/context/NoteContext'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ThemedText from '@/components/themedText'

const EditNote = () => {

  const colorScheme = useColorScheme() ?? 'light'
  const theme = Colors[colorScheme]
  const { id } = useLocalSearchParams<{ id: string }>()
  const { getNoteById, updateNote } = useNote()
  const notes = getNoteById(id)
  const router = useRouter()

  const { control, handleSubmit } = useForm({
    defaultValues: notes,
  })

  const onSubmit = (data: any) => {
    updateNote(id, data)
    router.push("/")
  }

  return (
    <>
      {notes ?
        <View style={[styles.root, { backgroundColor: theme.background }]}>
          <Header />
          <ThemedTextBox control={control} name='title' title='Title' placeholder='Note title' />
          <ThemedTextBox control={control} name='content' title='Description' placeholder='Note description' />
          <ThemedButton buttonText='Update Note' onPress={handleSubmit(onSubmit)} ></ThemedButton>
        </View>
        :
        <View style={styles.noteNotFound}>
          <ThemedText scheme='header' type='ui'>Unable to locate a note to edit</ThemedText>
          <ThemedButton buttonText='Go back' onPress={router.push("/")}></ThemedButton>
        </View>

      }
    </>
  )
}

export default EditNote

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  noteNotFound: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})