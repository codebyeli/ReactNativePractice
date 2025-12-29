import { StyleSheet, Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors'

const ThemedText = ({ style, type, scheme, ...props }: any) => {
    const colorScheme = useColorScheme() ?? 'light'
    const theme = Colors[colorScheme]

    return (
        <Text style={[type === 'ui' ? { color: theme.uitext } : { color: theme.text },
        scheme === 'default' ? styles.default : undefined,
        scheme === 'title' ? styles.title : undefined,
        scheme === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        scheme === 'subtitle' ? styles.subtitle : undefined,
            style]}
            {...props}
        />
    )
}
export default ThemedText

const styles = StyleSheet.create({
        title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
        subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
})