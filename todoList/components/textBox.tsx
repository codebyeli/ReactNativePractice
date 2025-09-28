import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

type TextBoxProps = {
  label: string;
  placeholder: string;
  onChange?: (text: string) => void;
  value?: string;
};

const TextBox = (props: TextBoxProps) => {
  return (
    <View>
      <Text>{props.label}</Text>
      <TextInput placeholder={props.placeholder} onChangeText={props.onChange} value={props.value}/>
    </View>
  );
};

const styles = StyleSheet.create({
    labelText: {

    },
    input:{

    }
})

export default TextBox;
