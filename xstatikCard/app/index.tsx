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
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Hello, my name is Eli</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardSegment1}>
            <Text>I am 23 years old</Text>
            <Text>I like:</Text>
            <Text>Building coding projects</Text>
            <Text>Designing wallpapers</Text>
            <Text>Editing videos</Text>
            <Text>Spending time with friends/family</Text>
          </View>
          <View style={styles.cardSegment2}>
            <Text>I am 23 years old</Text>
            <Text>I like:</Text>
            <Text>Building coding projects</Text>
            <Text>Designing wallpapers</Text>
            <Text>Editing videos</Text>
            <Text>Spending time with friends/family</Text>
          </View>
        </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  titleTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    padding: 10,
    fontWeight: "900",
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 7,
    height: 500,
    borderRadius: 25,
    width: 800,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardSegment1: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cardSegment2: {
    flex: 4,
  }
});
