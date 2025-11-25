import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Task } from '../types';

interface Props {
  task: Task;
  onToggle: () => void;
}

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <Pressable onPress={onToggle}>
      <Text style={[styles.text, task.done && styles.done]}>
        {task.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 8,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
