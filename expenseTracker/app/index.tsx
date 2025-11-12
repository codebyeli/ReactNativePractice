import { useState } from "react";
import { Text, View, StyleSheet, Button, FlatList, TextInput } from "react-native";
import TextBox from "@/components/textBox";
import SelectDropdown from "react-native-select-dropdown";

export default function Index() {
  type Entry = {
    id: number;
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
  const [count, setCount] = useState(0);
  const [entriesForm, setEntriesForm] = useState<Entry>({
    id: count,
    type: "",
    amount: 0,
    name: "",
    description: "",
  });

  const [budget, setBudget] = useState<Budget>({
    amount: 0,
    isOverBudget: false,
  });

  function createEntry() {
    const newEntries = [
      ...entries,
      {
        id: count,
        type: entriesForm.type,
        amount: entriesForm.amount,
        name: entriesForm.name,
        description: entriesForm.description,
      },
    ];
    setEntries(newEntries);
    budgetCheck(newEntries);
    setEntriesForm({
      id: count,
      type: "",
      amount: 0,
      name: "",
      description: "",
    });
    setCount(count + 1);
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
          <Button
            title="Save budget"
            onPress={() =>
              setBudget({ amount: parseInt(budgetInput), isOverBudget: false })
            }
          />
        </View>
      ) : (
        <View>
          {budget.isOverBudget === true ? (
            <Text>
              {" "}
              Monthly budget: {budget.amount ? budget.amount : "No budget set"},
              over budget{" "}
            </Text>
          ) : (
            <Text>
              {" "}
              Monthly budget: {budget.amount
                ? budget.amount
                : "No budget set"}{" "}
            </Text>
          )}
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
          <SelectDropdown
            data={[
              { title: "Expense", value: "expense" },
              { title: "Income", value: "income" },
            ]}
            onSelect={(text) => setEntriesForm({ ...entriesForm, type: text })}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.textBoxContainer}>
                  <Text style={styles.labelText}>Type of entry</Text>
                  <TextInput style={styles.input} value={selectedItem.title} editable={false} />
                </View>
              )

            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View>
                  <Text>{item.title}</Text>
                </View>
              );
            }}
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
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
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
  textBoxContainer: {
    paddingVertical: 4,
    marginBottom: 8
  },
  labelText: {
    fontWeight: 700,
    fontSize: 20,
    paddingVertical: 4,
    padding: 10,
  },
  input: {
    height: 35,
    padding: 10,
    backgroundColor: '#EBEBEB',
    borderRadius: 25,
    borderWidth: 1
  },
});
