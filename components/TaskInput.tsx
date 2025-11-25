import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  text: string;
  setText: (value: string) => void;
  addTask: () => void;
}

export default function TaskInput({ text, setText, addTask }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Save" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 8,
    marginRight: 10,
  },
});
