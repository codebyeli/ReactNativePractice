import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import TextBox from "@/components/textBox";
import SelectDropdown from "react-native-select-dropdown";
import { Trash, Pencil } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entry, Budget, Category } from "@/constants/types";

export default function Index() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 0,
      budget: 9999999,
      name: "Other [Expense]",
      type: "expense",
      description:
        "Placeholder category, use the button Add Category to add more",
    },
    {
      id: 1,
      budget: 9999999,
      name: "Other [Income]",
      type: "income",
      description:
        "Placeholder category, use the button Add Category to add more",
    },
  ]);
  const [filteredEntries, setFilteredEntries] = useState("all");
  const [budgetInput, setBudgetInput] = useState("");
  const [count, setCount] = useState(0);
  const [editBudgetModal, setEditBudgetModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState<Category>({
    id: count,
    budget: 0,
    name: "",
    type: "expense",
    description: "",
  });
  const [entriesForm, setEntriesForm] = useState<Entry>({
    id: count,
    amount: 0,
    name: "",
    description: "",
  });

  const [budget, setBudget] = useState<Budget>({
    amount: 0,
    isOverBudget: false,
  });

/*   useEffect(() => {
    const loadEntries = async () => {
      const data = await AsyncStorage.getItem("entries");
      if (data) setEntries(JSON.parse(data));
    };
    loadEntries();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    const loadBudget = async () => {
      const data = await AsyncStorage.getItem("budget");
      if (data) setBudget(JSON.parse(data));
    };
    loadBudget();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]); */

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
    setEntriesForm({
      id: count,
      amount: 0,
      name: "",
      description: "",
    });
    setCount(count + 1);
    setEntries(newEntries);
    budgetCheck(newEntries);
  }

  function createCategory() {
    const newCategories = [
      ...categories,
      {
        id: count,
        type: categoryForm.type,
        budget: categoryForm.budget,
        name: categoryForm.name,
        description: categoryForm.description,
      },
    ];
    setCategoryForm({
      id: count,
      budget: 0,
      name: "",
      description: "",
    });
    setCount(count + 1);
    setCategories(newCategories);
  }

  function budgetCheck(currentEntries: Entry[], budgetAmount?: number) {
    const expenses = currentEntries
      .filter((entry) => entry.category?.type === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0);

    setBudget((prevBudget) => ({
      ...prevBudget,
      amount: budgetAmount ?? prevBudget.amount,
      isOverBudget: expenses > (budgetAmount ?? prevBudget.amount),
    }));
  }

  function deleteEntry(id: number) {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    budgetCheck(updatedEntries);
  }

  const filteredData = entries.filter((entry) => {
    if (filteredEntries === "all") {
      return entry.category?.type === "expense" || entry.category?.type === "income";
    }
    return entry.category?.type === filteredEntries;
  });

  const incomeSum = entries
    .filter((entry) => entry.category?.type === "income")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const expensesSum = entries
    .filter((entry) => entry.category?.type === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <View style={styles.screen}>
      <Modal
        animationType="none"
        transparent={false}
        visible={editBudgetModal}
        onRequestClose={() => {
          setEditBudgetModal(!editBudgetModal);
        }}
      >
        <View style={styles.centerContainer}>
          <TextBox
            label="Whats your new monthly budget?"
            placeholder="Budget"
            value={budgetInput}
            onChange={setBudgetInput}
            keyboardType="numeric"
          ></TextBox>
          <Button
            title="Save budget"
            onPress={() => {
              const newBudgetAmount = parseInt(budgetInput);
              setEditBudgetModal(!editBudgetModal);
              setBudgetInput("");
              budgetCheck(entries, newBudgetAmount);
            }}
          />
          <View style={{ marginVertical: 10 }}>
            <Button
              title="Cancel"
              onPress={() => {
                setEditBudgetModal(!editBudgetModal);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={false}
        visible={categoryModal}
        onRequestClose={() => {
          setCategoryModal(!categoryModal);
        }}
      >
        <View style={styles.centerContainer}>
          <TextBox
            label="Name"
            placeholder="Name"
            value={categoryForm.name}
            onChange={(text) =>
              setCategoryForm({ ...categoryForm, name: text })
            }
          />
          <TextBox
            label="Amount"
            placeholder="Amount"
            value={
              categoryForm.budget === 0 ? "" : categoryForm.budget.toString()
            }
            onChange={(text) => {
              const numValue = text === "" ? 0 : parseInt(text);
              setCategoryForm({ ...categoryForm, budget: numValue });
            }}
            keyboardType="numeric"
          />
          <SelectDropdown
            data={[
              { title: "Expense", value: "expense" },
              { title: "Income", value: "income" },
            ]}
            onSelect={(selectedItem) =>
              setCategoryForm({ ...categoryForm, type: selectedItem.value })
            }
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.textBoxContainer}>
                  <Text style={styles.labelText}>Type of category</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedItem?.title || "Select type"}
                    editable={false}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View>
                  <Text style={styles.selectText}>{item.title}</Text>
                </View>
              );
            }}
          />
          <TextBox
            label="Description"
            placeholder="Description"
            value={categoryForm.description}
            onChange={(text) =>
              setCategoryForm({ ...categoryForm, description: text })
            }
          />
          <Button title="Save Category" onPress={createCategory} />
          <View style={{ marginVertical: 10 }}>
            <Button
              title="Cancel"
              onPress={() => {
                setCategoryModal(!categoryModal);
              }}
            />
          </View>{" "}
        </View>
      </Modal>
      {budget.amount === 0 ? (
        <View style={styles.centerContainer}>
          <TextBox
            label="What's your monthly budget?"
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
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.budgetText}>
              Monthly budget: {budget.amount}{" "}
              {budget.isOverBudget && (
                <Text style={styles.overBudget}>— OVER BUDGET!</Text>
              )}
              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  setEditBudgetModal(true);
                }}
              >
                <Pencil />
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  setCategoryModal(true);
                }}
              >
                <Pencil />
              </Pressable>
            </Text>

            <TextBox
              label="Name"
              placeholder="Name"
              value={entriesForm.name}
              onChange={(text) =>
                setEntriesForm({ ...entriesForm, name: text })
              }
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
              data={categories}
              onSelect={(selectedItem) =>
                setEntriesForm({ ...entriesForm, type: selectedItem.value })
              }
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.textBoxContainer}>
                    <Text style={styles.labelText}>Category</Text>
                    <TextInput
                      style={styles.input}
                      value={selectedItem?.name || "Select category"}
                      editable={false}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View>
                    <Text style={styles.selectText}>{item.name}</Text>
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

            <Button title="Save Entry" onPress={createEntry} />
          </View>
          {filteredEntries === "income" ? (
            <Text>Income Sum: {incomeSum} </Text>
          ) : (
            <Text>Expenses Sum: {expensesSum}</Text>
          )}
          <Text>Total (Income - Expenses) ${incomeSum - expensesSum}</Text>
          <SelectDropdown
            data={[
              { title: "All", value: "all" },
              { title: "Expense", value: "expense" },
              { title: "Income", value: "income" },
            ]}
            onSelect={(selectedItem) => setFilteredEntries(selectedItem.value)}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.textBoxContainer}>
                  <Text style={styles.labelText}>Filter</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedItem?.title || "Filter by type"}
                    editable={false}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View>
                  <Text style={styles.selectText}>{item.title}</Text>
                </View>
              );
            }}
          />
          <FlatList
            data={filteredData}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: 140 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.entryContainer}>
                <View style={styles.entryHeaders}>
                  <Text style={styles.entryHeadersText}>{item.name}</Text>
                  {item.category?.type === "expense" ? (
                    <Text style={[styles.entryHeadersText, { color: "red" }]}>
                      {item.amount}
                    </Text>
                  ) : (
                    <Text style={[styles.entryHeadersText, { color: "blue" }]}>
                      {item.amount}
                    </Text>
                  )}
                </View>
                <Text>{item.category?.type}</Text>
                {item.description ? <Text>{item.description}</Text> : null}
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteEntry(item.id)}
                >
                  <Trash color="red" />
                </Pressable>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#F4F4F4",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  container: {
    flex: 1,
    paddingHorizontal: 30,
  },

  formContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  budgetText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },

  overBudget: {
    color: "red",
    fontWeight: "700",
  },

  list: {
    flex: 1,
    marginTop: 10,
  },

  entryContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 6,
    backgroundColor: "#EBEBEB",
    borderRadius: 15,
  },

  entryHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  entryHeadersText: {
    fontWeight: "700",
    fontSize: 17,
  },

  textBoxContainer: {
    paddingVertical: 4,
    width: "100%",
  },

  labelText: {
    fontWeight: "700",
    fontSize: 16,
    paddingBottom: 4,
  },

  input: {
    height: 35,
    padding: 10,
    backgroundColor: "#EBEBEB",
    borderRadius: 25,
    borderWidth: 1,
  },

  selectText: {
    fontSize: 16,
    fontWeight: "500",
    padding: 10,
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
