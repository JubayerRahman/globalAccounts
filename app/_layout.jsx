import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import AuthProvider from '../AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'

const RootLayout = () => {
  return (
    <SafeAreaView>
      <AuthProvider>
        <View className="h-full bg-[#28282B]">
          <Slot/>
        </View>
      </AuthProvider>
    </SafeAreaView>
  )
}

export default RootLayout