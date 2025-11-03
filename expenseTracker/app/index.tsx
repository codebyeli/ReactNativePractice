import { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import TextBox from "@/components/textBox";
import RNPickerSelect from "react-native-picker-select";

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
      {budget === undefined ? (
        <View>
          <TextBox
            label="What's your current monthly budget?"
            placeholder="Budget"
            onChange={(text) => setBudget({ amount: parseInt(text) })}
          />
          <Button
            title="Save budget"
            onPress={() => {
            }}
          />
        </View>
      ) : (
        <View>
          <Text>
            Monthly budget: {budget?.amount ? budget.amount : "No budget set"}
          </Text>
          <TextBox label="Name" placeholder="Name" />
          <TextBox label="Amount" placeholder="Amount" />
          <RNPickerSelect
            onValueChange={(value) => (value)}
            items={[
              { label: "Expense", value: "expense" },
              { label: "Income", value: "income" },
            ]}
          />
          <TextBox label="Description" placeholder="description" />
          <Button
            title="Save"
            onPress={() => {
            }}
          />
        </View>
      )}
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
