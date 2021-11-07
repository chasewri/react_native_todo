import React, { useState } from 'react'
// import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, Link } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './components/LoginScreen'
import { StyleSheet } from 'react-native'
import MainDrawer from './components/DrawerNav'

const Stack = createNativeStackNavigator()

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  const headerStyle = {
    headerStyle: {
      backgroundColor: 'plum'
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Drawer" component={MainDrawer} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={headerStyle}>
              {() => <LoginScreen setUser={setUser} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  user: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    // marginVertical: 12
    fontSize: 16
  }
})

export default App
