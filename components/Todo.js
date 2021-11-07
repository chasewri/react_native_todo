import React from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import Trash from './icons/Trash'

export default function Todo({ text, id, handleDeleteConfirm }) {
  const handleTrashTouch = () => {
    Alert.alert(
      'Delete Todo?',
      null,
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteConfirm(id)
        }
      ],
      {
        cancelable: true
      }
    )
  }

  return (
    <View style={styles.todoStyles}>
      <Text style={styles.textStyles}>{text}</Text>
      <View style={styles.trashContainer} onTouchStart={handleTrashTouch}>
        <Trash style={styles.trash} height={25} width={25} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  todoStyles: {
    borderColor: 'plum',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 22,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth:'90%'
  },
  textStyles: {
    fontSize: 22,
    paddingRight: 50,
    maxWidth: '98%'
  },
  trash: {
    marginLeft: 15
  },
  trashContainer: {
    marginRight: 5,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 15,
    borderColor: 'red',
    borderWidth: 1,
    right: 10,
    position: 'absolute'
  }
})
