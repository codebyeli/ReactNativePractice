import { StyleSheet, View, Pressable, useColorScheme } from 'react-native'
import React from 'react'
import { Plus } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'

const AddButton = ({ onPress }: any) => {

    const colorScheme = useColorScheme() ?? 'light'
    const theme = Colors[colorScheme]

    return (
        <View style={styles.container}>
            <Pressable style={[styles.button, { backgroundColor: theme.uiforeground }]} onPress={onPress}><Plus size={50} color={'white'} /></Pressable>
        </View >
    )
}

export default AddButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        width: 75,
        height: 75,
        padding: 13,
        marginRight: 15,
        marginBottom: 15
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        height: "100%",
    }
})