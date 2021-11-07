import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  Image
} from 'react-native'

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/plum_logo.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  image: {
    height: 300,
    width: 300
  }
})
