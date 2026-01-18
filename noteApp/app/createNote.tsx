import { StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import * as Crypto from 'expo-crypto';
import ThemedTextBox from '@/components/themedTextBox'
import Header from '@/components/header'
import { Colors } from '@/constants/Colors'
import { useForm } from 'react-hook-form'
import ThemedButton from '@/components/themedButton'
import { useNote } from '@/context/NoteContext'
import { useRouter } from 'expo-router'

const createNote = () => {

    const colorScheme = useColorScheme() ?? 'light'
    const theme = Colors[colorScheme]
    const { addNote } = useNote()
    const router = useRouter()
  
    const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    addNote({
      id: Crypto.randomUUID(),
      title: data.title,
      content: data.content,
      isCompleted: false,
    })
    router.push("/")
}

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header />
      <ThemedTextBox control={control} name='title' title='Title' placeholder='Note title' />
      <ThemedTextBox control={control} name='content' title='Description' placeholder='Note description' multiline={true} />
      <ThemedButton buttonText='Save Note' onPress={handleSubmit(onSubmit)} ></ThemedButton>
    </View>
  )
}

export default createNote

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})