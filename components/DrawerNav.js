import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TodosScreen from './TodosScreen'
import SplashScreen from './SplashScreen'

const Drawer = createDrawerNavigator()

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Todos" component={TodosScreen} />
      <Drawer.Screen name="Spash" component={SplashScreen} />
    </Drawer.Navigator>
  )
}
