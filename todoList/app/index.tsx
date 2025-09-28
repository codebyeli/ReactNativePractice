import { router } from "expo-router";
import React from "react";
import { Text, StyleSheet, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskList = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[{ key: "Data" }]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
      <Button
        title="New task"
        onPress={() => router.push("/createTask")}
      />
    </SafeAreaView>
  );
};

function Index() {
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.titleText}>To do app</Text>
      <TaskList />
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
