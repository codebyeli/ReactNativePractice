import { Text, View, StyleSheet, Image } from "react-native";

type cardUserInfo = {
  name: string,
  introduction: string,
  ocuppation: string,
  hobbies: string[]
}

const me: cardUserInfo = {
  name: 'Eli',
  introduction: 'Nice to meet you!',
  ocuppation: 'Software Engineer',
  hobbies: ['Music', 'Coding', 'Developing']
}

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
          <Text style={styles.titleText}>Hello, my name is {me.name}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardSegment1}>
            <Image style={styles.imageContainer} source={require('@/assets/images/IMG_0118.jpg')} />
            <Text>{me.introduction}</Text>
          </View>
          <View style={styles.cardSegment2}>
            <Text>I&apos;m a {me.ocuppation}</Text>
            <Text>I my hobbies are:</Text>
            <Text>{me.hobbies.join(', ')}</Text>
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
    fontWeight: "700"
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 7,
    height: 300,
    borderRadius: 25,
    width: 500,
  },
  imageContainer: {
    margin: 15,
    height: 150,
    width: 150,
    borderRadius: 100,
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
