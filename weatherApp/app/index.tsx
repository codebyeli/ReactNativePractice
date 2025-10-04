import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const [x, setX] = useState()
  useEffect( () => {}, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Weather App</Text>
    </View>
  );
}

const styles = StyleSheet.create({

})
