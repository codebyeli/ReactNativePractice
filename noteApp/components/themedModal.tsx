import { Modal, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import ThemedView from './themedView'
import ThemedText from './themedText'
import ThemedButton from './themedButton'

const ThemedModal = ({
    style,
    visible,
    title,
    description,
    onConfirm,
    onCancel, ...props }: any) => {
    const colorScheme = useColorScheme() ?? 'light'
    const theme = Colors[colorScheme]

    return (
        <Modal visible={visible} onRequestClose={onCancel} transparent>
            <View style={styles.overlay}>
                <ThemedView style={styles.popup}>
                    <ThemedText scheme='subtitle'>{title}</ThemedText>
                    <ThemedText scheme='default'>{description}</ThemedText>
                    <View style={styles.row}>
                        <ThemedButton buttonText='Yes' onPress={onConfirm}></ThemedButton>
                        <ThemedButton buttonText='No' transparent={true} onPress={onCancel}></ThemedButton>
                    </View>
                </ThemedView>
            </View>
        </Modal>
    )
}

export default ThemedModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        padding: 20,
        borderRadius: 15,
        width: '80%',
        maxWidth: 350,
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center',
        marginTop: 15,
        gap: 10,
    }
})