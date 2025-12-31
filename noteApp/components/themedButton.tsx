import { Pressable, StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedText from './themedText'
import { Colors } from '@/constants/Colors'

const ThemedButton = ({
    buttonText,
    onPress
}: any) => {

        const colorScheme = useColorScheme() ?? 'light'
        const theme = Colors[colorScheme]
        
    return (
        <View>
            <Pressable style={[styles.button, { backgroundColor: theme.uiforeground }]} onPress={onPress}><ThemedText scheme='defaultSemiBold' type='ui' >{buttonText}</ThemedText></Pressable>
        </View>
    )
}

export default ThemedButton

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius:25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:25
    }
})