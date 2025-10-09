import { WeatherState } from "@/constants/openMeteo.interface";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [data, setData] = useState<WeatherState>();
  const { height, width, scale, fontScale } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=18.47&longitude=69.94&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1"
        );
        if (!response.ok) {
          console.log("error: ", response);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("error :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        style={[styles.image, { width, height }]} // ✅ responsive sizing
        source={require("@/assets/images/sky.jpg")}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.coloredText}>Current Temp</Text>
        <Text style={styles.mainTemp}>
          {data ? data.daily.temperature_2m_max[0] : "Loading..."} °C
        </Text>
                <Text style={styles.coloredText}>
          Santo Domingo
        </Text>
        <Text style={styles.coloredText}>
          Min Temp {data ? data.daily.temperature_2m_min[0] : "Loading..."} °C
        </Text>
        <Text style={styles.coloredText}>
          Today is {data ? data.daily.time[0] : "Loading..."}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    resizeMode: "cover",
    opacity: 0.7,
    zIndex: 0,
  },
  header: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 2,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowRadius: 10,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  mainTemp: {
    fontSize: 72,
    fontWeight: "700",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  coloredText: {
    color: "white",
    marginBottom: 4,
    fontSize: 24,
    fontWeight: 500,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowRadius: 10,
  },
});
