import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Down Count"
          onPress={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
        ></Button>
        <Button
          title="Up Count"
          onPress={() => {
            setCount(count + 1);
          }}
        ></Button>
      </View>
    </View>
  );
};

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 500,
        minWidth: 500,
      }}
    >
      <Text style={styles.title}>Counter App</Text>
      <Counter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
  count: {
    fontSize: 60,
  },
  buttonContainer: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    right: 14,
  },
  button: {
    margin: 13,
  },
});
