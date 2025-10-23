import React, { useState } from "react";
import { Text, StyleSheet, FlatList, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextBox from "@/components/textBox";
import { Checkbox } from 'expo-checkbox';

type Task = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  reward?: string;
};

function Index() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    reward: "",
  });
  const [showForm, setShowForm] = useState(true);

  function createTask() {
    if (!taskForm.name.trim()) return;
    setTasks([
      ...tasks,
      {
        id: count,
        name: taskForm.name,
        description: taskForm.description,
        completed: false,
        reward: taskForm.reward,
      },
    ]);
    setCount(count + 1);
    setTaskForm({ name: "", description: "", reward: "" });
    setShowForm(false);
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleteOnTask(id: number) {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  return (
    <SafeAreaView style={styles.body}>
      {showForm ? (
        <View>
          <Text style={styles.titleText}>To Do App</Text>
          <TextBox
            label="Name"
            placeholder="Task name"
            value={taskForm.name}
            onChange={(text) => setTaskForm({ ...taskForm, name: text })}
          />
          <TextBox
            label="Description"
            placeholder="Task description"
            value={taskForm.description}
            onChange={(text) =>
              setTaskForm({ ...taskForm, description: text })
            }
          />
          <TextBox
            label="Reward"
            placeholder="Reward for completing task"
            value={taskForm.reward}
            onChange={(text) => setTaskForm({ ...taskForm, reward: text })}
          />
          <Button title="Save task" onPress={createTask} />
        </View>
      ) : (
        <View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <View style={styles.row}>
                  <View style={styles.checkboxContainer}>
                  <Checkbox  value={item.completed} onChange={() => toggleCompleteOnTask(item.id)} />
                  </View>
                  <View>
                  <Text style={styles.taskTitle}>{item.name}</Text>
                  <Text style={styles.taskText}>{item.description}</Text>
                  {item.reward ? (
                    <Text style={styles.taskTextBold}>Reward for completion: {item.reward}</Text>
                  ) : (
                    <></>
                  )}
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button title="Delete" onPress={() => deleteTask(item.id)} />
                </View>
              </View>
            )}
          />
          <Button title="New task" onPress={() => setShowForm(true)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    margin: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: '#EBEBEB',
    borderRadius: 25,
    padding: 15,
    margin: 12
  },
  taskTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 500
  },
  taskText: {
    fontSize: 16,
  },
  taskTextBold: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
    checkboxContainer: {
    width: 75,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
});

export default Index;
