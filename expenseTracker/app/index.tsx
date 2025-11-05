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
    const newEntries = [
      ...entries,
      {
        type: entriesForm.type,
        amount: entriesForm.amount,
        name: entriesForm.name,
        description: entriesForm.description,
      },
    ];
    setEntries(newEntries);
    budgetCheck(newEntries);
    setEntriesForm({ type: "", amount: 0, name: "", description: "" });
  }

  function budgetCheck(currentEntries: Entry[]) {
    const expenses = currentEntries
      .filter((entry) => entry.type === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0);

    if (expenses > budget.amount && budget.isOverBudget === false) {
      setBudget({ ...budget, isOverBudget: true });
    } else if (expenses <= budget.amount && budget.isOverBudget === true) {
      setBudget({ ...budget, isOverBudget: false });
    }
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
          {
            budget.isOverBudget === true ? (
              <Text> Monthly budget: {budget.amount ? budget.amount : "No budget set"}, you're over budget </Text>
            ) : (
              <Text> Monthly budget: {budget.amount ? budget.amount : "No budget set"} </Text>
            )
          }
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
