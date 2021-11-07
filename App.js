import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Button from 'react-native-button'
import Todo from './components/Todo'
import { getAirtable } from './util/getAirtable'
import axios from 'axios'

export default function App() {
  const [taskList, setTaskList] = useState([])

  const [newTask, setNewTask] = useState('')

  const handleTextChange = (text) => {
    setNewTask(text)
  }

  const handleAddButtonPress = async () => {
    if (newTask === '') {
      return
    }

    // setTaskList([...taskList, newTask])
    const response = await axios.post(
      'https://upbeat-snyder-6fb606.netlify.app/api/createTodo',
      { todo: newTask }
    )

    refreshTodos()

    setNewTask('')
  }

  const handleChildDelete = async (id) => {
    // console.log(idx)
    // const arrayElRemoved = taskList.filter((el, index) => index !== idx)
    const response = await axios.post(
      'https://upbeat-snyder-6fb606.netlify.app/api/deleteTodo',
      { todoId: id }
    )

    refreshTodos()

    // setTaskList(arrayElRemoved)
  }

  const refreshTodos = async () => {
    const startingTable = await getAirtable()
    const orderedTable = startingTable.sort((el) => el.id)
    setTaskList(startingTable)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.addText}>
        {taskList.length > 0 ? '' : 'Welcome, add a todo!'}
      </Text>

      <View>
        {taskList.map((task, idx) => (
          <Todo
            text={task.Todo}
            key={task.id}
            id={task.id}
            handleDeleteConfirm={handleChildDelete}
          />
        ))}
      </View>

      <TextInput
        style={styles.inputStyle}
        placeholder="Add here!"
        value={newTask}
        onChangeText={handleTextChange}
      />
      <StatusBar style="auto" />
      <Button style={styles.buttonStyles} onPress={handleAddButtonPress}>
        Add +
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    borderColor: 'plum',
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginVertical: 16,
    fontSize: 20,
    minWidth: '90%'
  },
  buttonStyles: {
    color: 'white',
    backgroundColor: 'plum',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 5
  },
  addText: {
    fontSize: 24
  }
})
