import { StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedTextBox from '@/components/themedTextBox'
import Header from '@/components/header'
import { Colors } from '@/constants/Colors'
import { useForm } from 'react-hook-form'

const createNote = () => {

    const colorScheme = useColorScheme() ?? 'light'
    const theme = Colors[colorScheme]
  
    const { control, handleSubmit } = useForm()

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Header />
      <ThemedTextBox control={control} name='title' title='Title' placeholder='Note title' />
      <ThemedTextBox control={control} name='content' title='Description' placeholder='Note description' />
    </View>
  )
}

export default createNote

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})