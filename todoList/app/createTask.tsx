import { View, Text } from 'react-native'
import React, { useState } from 'react'

type Tasks = {
    id?: number;
    name: string;
    description: string;
    completed: boolean;
    reward?: string;
};

const createTask = () => {
    const [task, setTask] = useState([])
    return (
        <View>
            <Text>createTask</Text>
        </View>
    )
}

export default createTask