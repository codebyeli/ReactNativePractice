import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import TextBox from "@/components/textBox";
import RNPickerSelect from "react-native-picker-select"


export default function Index() {
  type Entry = {
    type: string;
    amount: number;
    name: string;
    description?: string;
  };

  type Budget = {
    amount?: number;
    isOverBudget?: boolean;
  };

  const [entries, setEntries] = useState<Entry>({
    type: "",
    amount: 0,
    name: "",
    description: "",
  });

  const [budget, setBudget] = useState<Budget>();

  return (
    <View style={styles.body}>
      <TextBox label="Name" placeholder="Name" />
      <TextBox label="Amount" placeholder="Amount" />
      <RNPickerSelect onValueChange={()=>{}} items={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
