import { Button, Text, View } from "react-native";

type CounterProps = {
  number: number
}

const Counter = (props: CounterProps) => {
  return(
    <View>
      <Text>{props.number}</Text>
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
      <Counter number={9}/>
    </View>
  );
}