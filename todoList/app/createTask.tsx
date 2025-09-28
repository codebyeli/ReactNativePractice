import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import TextBox from '@/components/textBox';

/* type Tasks = {
    id?: number;
    name: string;
    description: string;
    completed: boolean;
    reward?: string;
};
 */
const createTask = () => {
    // const [task, setTask] = useState([])
    return (
        <View>
            <TextBox label='Hola' placeholder='Hello' />
        </View>
    )
}

export default createTask