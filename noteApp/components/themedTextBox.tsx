import { StyleSheet, TextInput, useColorScheme, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Controller } from 'react-hook-form'
import ThemedText from './themedText'

const ThemedTextBox = ({
    control,
    name,
    rules = {},
    title,
    placeholder,
    isError,
    secureTextEntry,
    multiline, 
    ...props
}: any) => {

    const colorScheme = useColorScheme() ?? 'light'
    const theme = Colors[colorScheme]

    return (

        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <View>
                    <ThemedText style={styles.title} scheme='subtitle' type='ui'>{title}</ThemedText>
                    <TextInput
                        placeholder={placeholder ? placeholder : "..."}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={[styles.input, { backgroundColor: theme.background }]}
                        secureTextEntry={secureTextEntry}
                        multiline={multiline}
                        numberOfLines={multiline ? 10 : 1}
                        maxLength={90}
                    />
                </View>
            )}
        />

    )
}

export default ThemedTextBox

const styles = StyleSheet.create({
    input: {
        borderRadius: 7,
        borderWidth: 1,
        marginTop: 2,
        paddingLeft: 7,
        paddingVertical: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    title: {
        paddingLeft: 7,
        marginHorizontal: 10
    }
})