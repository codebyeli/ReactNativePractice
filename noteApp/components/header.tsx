import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedText from './themedText'

const Header = () => {
  return (
    <View style={styles.container}>
      <ThemedText type='back' scheme='title' style={styles.titleText}>Note App</ThemedText>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        marginLeft: 15,
    }
})