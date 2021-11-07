import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ToastAndroid
} from 'react-native'
import Button from 'react-native-button'
import Todo from './Todo'
import { getAirtable } from '../util/getAirtable'
import { domainNameBase } from '../util/api'
import axios from 'axios'

export default function TodosScreen({ navigation }) {
  const [taskList, setTaskList] = useState([])
  const [newTask, setNewTask] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [inputFocused, setInputFocuesd] = useState(false)
  const [addButtonDisabled, setAddButtonDisabled] = useState(false)
  const [delButtonDisabled, setDelButtonDisabled] = useState(false)

  const handleInputFocus = () => {
    setInputFocuesd(!inputFocused)
  }

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
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
    setAddButtonDisabled(true)
    // setTaskList([...taskList, newTask])
    const response = await axios.post(domainNameBase + 'createTodo', {
      todo: newTask
    })

    if (response.status === 202) {
      showToast('Todo created!')
    }

    refreshTodos()

    setNewTask('')
    setAddButtonDisabled(false)
  }

  const handleChildDelete = async (id) => {
    if (delButtonDisabled) {
      return
    }
    setDelButtonDisabled(true)
    // const arrayElRemoved = taskList.filter((el, index) => index !== idx)
    const response = await axios.post(domainNameBase + 'deleteTodo', {
      todoId: id
    })

    if (response.status === 202) {
      showToast('Todo deleted')
    }

    refreshTodos()

    setDelButtonDisabled(false)
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
            style={[
              styles.inputStyle,
              inputFocused ? styles.focused : styles.notFocused
            ]}
            placeholder="Add todo here!"
            value={newTask}
            onChangeText={handleTextChange}
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
          />
          <Button
            style={styles.buttonStyles}
            onPress={handleAddButtonPress}
            disabled={addButtonDisabled}
            styleDisabled={{ backgroundColor: 'lightgray' }}
          >
            Add +
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  externalContainer: {
    flex: 1
    // paddingVertical: '15%'
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
    marginTop: '25%'
  },
  lessMarginTop: {
    marginTop: '20%'
  }
})
