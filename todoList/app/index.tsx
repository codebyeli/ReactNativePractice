import { router } from "expo-router";
import React, { useState } from "react";
import { Text, StyleSheet, FlatList, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextBox from "@/components/textBox";

type Tasks = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  reward?: string;
};

function Index() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [taskForm, setTaskForm] = useState({
    name: '',
    description: '',
    reward: '',
  });

  function createTask() {
    setTasks([...tasks, {
      id: count,
      name: taskForm.name,
      description: taskForm.description,
      completed: false,
      reward: taskForm.reward,
    }])
    setCount(count + 1)
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.titleText}>To do app</Text>
      <TextBox label='Name' placeholder='Task name' value={taskForm.name} onChange={(text) => setTaskForm({ ...taskForm, name: text })} />
      <TextBox label='Description' placeholder='Task description' value={taskForm.description} onChange={(text) => setTaskForm({ ...taskForm, description: text })} />
      <TextBox label='Reward' placeholder='Reward for completing task' value={taskForm.reward} onChange={(text) => setTaskForm({ ...taskForm, reward: text })} />
      <Button title='Save task' onPress={createTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <Text>{item.name} <Button title="Delete task" onPress={() => deleteTask(item.id)} /></Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    margin: 12,
  },
  titleText: {
    fontSize: 50,
    fontWeight: 500,
  },
});

export default Index;
