import { WeatherState } from "@/constants/openMeteo.interface";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const [data, setData] = useState<WeatherState>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1');
        if (!response.ok) {
          console.log("error: ", response)
        }
        const result = await response.json();
        setData(result)
      }
      catch (error) {
        console.log('error :', error)
      }
    }
    fetchData()
  }, [])
  return (
    <SafeAreaView>
      <Image style={styles.image} source={require('@/assets/images/sky.jpg')} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
      <View style={styles.body}>
        <Text>Current Temp</Text>
        <Text style={styles.mainTemp}>{data ? data.daily.temperature_2m_max[0] : "Loading..."} °C</Text>
        <Text>Min Temp {data ? data.daily.temperature_2m_min[0] : "Loading..."} °C</Text>
        <Text>Today is {data ? data.daily.time[0] : "Loading..."}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    height: 850,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  image: {
    position: 'absolute',
    zIndex: 0
  },
  header: {
    top: 15,
    left: 15,
    zIndex: 2
  },
  headerText: {
    fontSize: 25,
    fontWeight: 500,
    zIndex: 2,
    color: 'white',
  },
  mainTemp: {
    fontSize: 50,
    fontWeight: 500,
    color: 'white',
    zIndex: 2
  },
})
