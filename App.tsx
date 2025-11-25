import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { Task } from './types';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem("TASKS");
      if (stored) {
        const parsed: Task[] = JSON.parse(stored);
        setTasks(parsed);
      }
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  const saveTasks = async (data: Task[]) => {
    try {
      await AsyncStorage.setItem("TASKS", JSON.stringify(data));
    } catch (err) {
      console.error("Failed to save tasks", err);
    }
  };

  const addTask = () => {
    if (text.trim().length === 0) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text,
      done: false,
    };

    setTasks(prev => [...prev, newTask]);
    setText("");
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>

      <TaskInput text={text} setText={setText} addTask={addTask} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={() => toggleTask(item.id)} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
