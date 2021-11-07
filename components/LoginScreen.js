import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import Button from 'react-native-button'

import * as GoogleAuth from 'expo-google-app-auth'

export default function LoginScreen({ setUser }) {
  const googleLoginAsync = async () => {
    try {
      const { type, user } = await GoogleAuth.logInAsync({
        androidClientId:
          '248044933124-uaki74l7ek5mg0bp8oavm0hkraukga62.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (type === 'success') {
        // console.log(user)
        setUser(user)
        // navigation.navigate('', { user })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const googleLogin = () => {
    googleLoginAsync()
  }

  return (
    <View styles={styles.container}>
      <View styles={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/plum_logo.png')}
        />
        <Button style={styles.buttonStyles} onPress={googleLogin}>
          Login with Google
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    marginTop: '60%'
  },
  image: {
    height: 300,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 120
  },
  buttonStyles: {
    marginTop: 40,
    color: 'white',
    backgroundColor: 'plum',
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 12
  }
})
