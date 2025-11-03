import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

type TextBoxProps = {
  label: string;
  placeholder: string;
  onChange?: (text: string) => void;
  value?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

const TextBox = (props: TextBoxProps) => {
  
  const handleTextChange = (text: string) => {
    if (props.keyboardType === 'numeric') {
      const cleanText = text.replace(/[^0-9]/g, '');
      props.onChange?.(cleanText);
    } else {
      props.onChange?.(text);
    }
  };

  return (
    <View style={styles.textBoxContainer}>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput 
        style={styles.input} 
        placeholder={props.placeholder} 
        onChangeText={handleTextChange} 
        value={props.value}
        keyboardType={props.keyboardType || 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textBoxContainer: {
    paddingVertical: 4,
    marginBottom: 8
  },
  labelText: {
    fontWeight: 700,
    fontSize: 20,
    paddingVertical: 4,
    padding: 10,
  },
  input: {
    height: 35,
    padding: 10,
    backgroundColor: '#EBEBEB',
    borderRadius: 25,
    borderWidth:1
  },
})

export default TextBox;