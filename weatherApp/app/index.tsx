import { WeatherState } from "@/constants/openMeteo.interface";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

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
    <View style={styles.body}>

      <Text>Current Temp {data ? data.daily.temperature_2m_max[0] : "Loading..."} °C</Text>
      <Text>Min Temp {data ? data.daily.temperature_2m_min[0] : "Loading..."} °C</Text>
      <Text>Today is {data ? data.daily.time[0] : "Loading..."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
