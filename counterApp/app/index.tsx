import { useState } from "react";
import { Button, Text, View } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return(
    <View>
      <Text>{count}</Text>
      <Button title="Up Count" onPress={()=>{
        setCount(count + 1)
      }}></Button>
      <Button title="Down Count" onPress={()=>{
        setCount(count - 1)
      }}></Button>
    </View>
  )
}

const DownCounter = () => {
  const [count, setCount] = useState(0);
  
  return(
    <View>
      <Text>{count}</Text>
      <Button title="Up Count" onPress={()=>{
        setCount(count + 1)
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
      <Text>Number</Text>
      <Counter/>
    </View>
  );
}