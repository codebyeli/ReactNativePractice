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
    amount: number;
    isOverBudget: boolean;
  };

  const [entries, setEntries] = useState<Entry[]>([]);
  const [budgetInput, setBudgetInput] = useState("");

  const [entriesForm, setEntriesForm] = useState<Entry>({
    type: "",
    amount: 0,
    name: "",
    description: "",
  });

  const [budget, setBudget] = useState<Budget>({
    amount: 0,
    isOverBudget: false
  });

  function createEntry() {
    setEntries([
      ...entries,
      {
        type: entriesForm.type,
        amount: entriesForm.amount,
        name: entriesForm.name,
        description: entriesForm.description,
      },
    ]);
    setEntriesForm({ type: "", amount: 0, name: "", description: "" });
  }

  return (
    <View style={styles.body}>
      {budget.amount === 0 ? (
        <View>
          <TextBox
            label="What's your current monthly budget?"
            placeholder="Budget"
            value={budgetInput}
            onChange={setBudgetInput}
            keyboardType="numeric"
          />
          <Button title="Save budget" onPress={() => setBudget({ amount: parseInt(budgetInput), isOverBudget: false })} />
        </View>
      ) : (
        <View>
          <Text> Monthly budget: {budget.amount ? budget.amount : "No budget set"} </Text>
          <TextBox
            label="Name"
            placeholder="Name"
            value={entriesForm.name}
            onChange={(text) => setEntriesForm({ ...entriesForm, name: text })}
          />
          <TextBox
            label="Amount"
            placeholder="Amount"
            value={
              entriesForm.amount === 0 ? "" : entriesForm.amount.toString()
            }
            onChange={(text) => {
              const numValue = text === "" ? 0 : parseInt(text);
              setEntriesForm({ ...entriesForm, amount: numValue });
            }}
            keyboardType="numeric"
          />
          <Text>Type of entry</Text>
          <RNPickerSelect
            onValueChange={(text) =>
              setEntriesForm({ ...entriesForm, type: text })
            }
            items={[
              { label: "Expense", value: "expense" },
              { label: "Income", value: "income" },
            ]}
            value={entriesForm.type}
          />
          <TextBox
            label="Description"
            placeholder="Description"
            value={entriesForm.description}
            onChange={(text) =>
              setEntriesForm({ ...entriesForm, description: text })
            }
          />
          <Button title="Save" onPress={createEntry} />
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
