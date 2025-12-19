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
import { Trash, Pencil, Plus } from "lucide-react-native";
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
    category: undefined,
  });

  const [budget, setBudget] = useState<Budget>({
    amount: 0,
    isOverBudget: false,
  });

   useEffect(() => {
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
  }, [budget]); 

  function createEntry() {
    if (!entriesForm.category) {
      alert("Please select a category");
      return;
    }

    const newEntries = [
      ...entries,
      {
        id: count,
        category: entriesForm.category,
        amount: entriesForm.amount,
        name: entriesForm.name,
        description: entriesForm.description,
      },
    ];
    setEntriesForm({
      id: count + 1,
      amount: 0,
      name: "",
      description: "",
      category: undefined,
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
      id: count + 1,
      budget: 0,
      name: "",
      type: "expense",
      description: "",
    });
    setCount(count + 1);
    setCategories(newCategories);
    setCategoryModal(false);
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

  function getCategorySpending(categoryId: number): { spent: number; remaining: number } {
    const categoryEntries = entries.filter(
      (entry) => entry.category?.id === categoryId && entry.category?.type === "expense"
    );
    const spent = categoryEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const categoryBudget = categories.find((cat) => cat.id === categoryId)?.budget || 0;
    const remaining = categoryBudget - spent;
    return { spent, remaining };
  }

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
            label="Budget"
            placeholder="Budget"
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
            </Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={styles.iconButton}
                onPress={() => {
                  setEditBudgetModal(true);
                }}
              >
                <Pencil size={20} />
                <Text style={styles.iconButtonText}>Edit Budget</Text>
              </Pressable>
              <Pressable
                style={styles.iconButton}
                onPress={() => {
                  setCategoryModal(true);
                }}
              >
                <Plus size={20} />
                <Text style={styles.iconButtonText}>Add Category</Text>
              </Pressable>
            </View>

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
                setEntriesForm({ ...entriesForm, category: selectedItem })
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
                      ${item.amount}
                    </Text>
                  ) : (
                    <Text style={[styles.entryHeadersText, { color: "blue" }]}>
                      ${item.amount}
                    </Text>
                  )}
                </View>
                <Text style={styles.categoryText}>
                  Category: {item.category?.name}
                </Text>
                {item.category?.type === "expense" && item.category?.id !== undefined && (
                  <View style={styles.budgetInfo}>
                    <Text style={styles.budgetInfoText}>
                      Spent: ${getCategorySpending(item.category.id).spent} / ${item.category.budget}
                    </Text>
                    <Text style={[
                      styles.budgetInfoText,
                      getCategorySpending(item.category.id).remaining < 0 
                        ? { color: "red", fontWeight: "700" }
                        : { color: "green" }
                    ]}></Text>
                  </View>
                )}
                {item.description ? <Text>{item.description}</Text> : null}
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteEntry(item.id)}
                >
                  <Trash color="red" size={20} />
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

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },

  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 5,
  },

  iconButtonText: {
    fontSize: 14,
    fontWeight: "500",
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

  categoryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },

  budgetInfo: {
    backgroundColor: "#F9F9F9",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },

  budgetInfoText: {
    fontSize: 13,
    fontWeight: "500",
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
    marginTop: 5,
  },
});