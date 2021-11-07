import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl
} from 'react-native'
import Button from 'react-native-button'
import Todo from './components/Todo'
import { getAirtable } from './util/getAirtable'
import axios from 'axios'

export default function App() {
  const [taskList, setTaskList] = useState([])

  const [newTask, setNewTask] = useState('')

  const [refreshing, setRefreshing] = useState(false)

  const [inputFocused, setInputFocuesd] = useState(false)

  const handleInputFocus = () => {
    setInputFocuesd(!inputFocused)
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    refreshTodos()
    setRefreshing(false)
  }, [])

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
    <SafeAreaView style={styles.externalContainer}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.innerContainer}>
          <Text
            style={[
              styles.addText,
              taskList.length <= 5 ? styles.addMarginTop : styles.lessMarginTop
            ]}
          >
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
            style={[styles.inputStyle, inputFocused ? styles.focused : styles.notFocused]}
            placeholder="Add here!"
            value={newTask}
            onChangeText={handleTextChange}
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
          />
          <StatusBar style="auto" />
          <Button style={styles.buttonStyles} onPress={handleAddButtonPress}>
            Add +
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  externalContainer: {
    flex: 1,
    paddingVertical: '15%'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    flex: 1
  },
  inputStyle: {
    borderColor: 'plum',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 16,
    fontSize: 20,
    minWidth: '90%',
    height: 50,
    borderRadius: 4
  },
  notFocused: {
    backgroundColor: 'lightgray'
  },
  focused: {
    backgroundColor: 'white'
  },
  buttonStyles: {
    color: 'white',
    backgroundColor: 'plum',
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 12
  },
  addText: {
    fontSize: 24
  },
  addMarginTop: {
    marginTop: '40%'
  },
  lessMarginTop: {
    marginTop: '20%'
  }
})
