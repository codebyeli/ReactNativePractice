import { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return(
    <View>
      <Text style={styles.titleText}>{count}</Text>
      <Button title="Up Count" onPress={()=>{
        setCount(count + 1)
      }}></Button>
      <Button title="Down Count" onPress={()=>{
        if (count > 0) {
        setCount(count - 1)
        }
      }}></Button>
    </View>
  )
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Counter App</Text>
      <Counter/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText:{
    fontSize: 60
  },
  buttonContainer:{
    flex: 1,
    flexDirection: "row",
    alignContent: "space-evenly"
  }
})