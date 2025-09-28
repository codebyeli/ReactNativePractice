import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

type TextBoxProps = {
  label: string;
  placeholder: string;
};

const TextBox = (props: TextBoxProps) => {
  return (
    <View>
      <Text>{props.label}</Text>
      <TextInput placeholder={props.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
    
})

export default TextBox;
