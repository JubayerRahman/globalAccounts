import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';

const Layout = () => {

    const TabIcons = ({ name, icon, focused }) => {
        return (
          <View className="items-center w-full">
            <View className={`${focused ? "bg-[#cec7bf] p-[5px] w-[80%] rounded-xl items-center" : "p-[5px] w-[80%] rounded-xl items-center"}`}>
              <AntDesign name={icon} size={24} color={`${focused ? "#28282B" : "white"}`} />
            </View>
            <Text className={`${focused ? "block text-white" : "hidden"}`}>{name}</Text>
          </View>
        )
      }
      
  return (
    <View className="flex-1 bg-[#28282B]">
     <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#3d737f",
            height: 75
          }
        }}
      >
        <Tabs.Screen name='index' options={{
          tabBarIcon: ({ focused }) => (
            <TabIcons
              name="Dashboard"
              icon="home"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='Transactions' options={{
          tabBarIcon: ({ focused }) => (
            <TabIcons
              name="Transactions"
              icon="bank"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='Accounts' options={{
          tabBarIcon: ({ focused }) => (
            <TabIcons
              name="Profile"
              icon="user"
              focused={focused}
            />
          )
        }} />
      </Tabs>
    </View>
  )
}

export default Layout