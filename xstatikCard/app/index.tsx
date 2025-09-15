import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>Hello, my name is Eli</Text>
        <View>
          <Text>I am 23 years old</Text>
          <Text>I like</Text>
          <Text>Building coding projects</Text>
          <Text>Designing wallpapers</Text>
          <Text>Editing videos</Text>
          <Text>Spending time with friends/family</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  titleText: {
    padding: 10,
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 7,
    height: 500,
    borderRadius: 25,
    width: 800,
  },
});
