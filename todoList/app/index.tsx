import React, { useState } from "react";
import { Text, StyleSheet, FlatList, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskList = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[
          { key: 'Data' },
        ]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
      <Button onPress={() => {
        
      }} title="New task" />
    </SafeAreaView>
  )
}

function Index() {
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.titleText} >To do app</Text>
      <TaskList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    left: 15,
    top: 15
  },
  titleText: {
    fontSize: 50,
    fontWeight: 500
  }
});

export default Index;