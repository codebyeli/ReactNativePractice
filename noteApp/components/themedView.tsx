import { View, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors'

const ThemedView = ({ style, ...props }: any) => {
    const colorScheme = useColorScheme() ?? 'light'
    const theme = Colors[colorScheme]

    return (
        <View style={[{ backgroundColor: theme.uibackground }, style]}
            {...props}
        />
    )
}
export default ThemedView