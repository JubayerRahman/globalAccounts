import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../AuthContext'
import { Link, useNavigation } from 'expo-router'

const Accounts = () => {

  const {Role, setRole} = useContext(AuthContext)
  const Navigator = useNavigation()

  const LogoutFunction = ()=>{
    setRole("")
  }

  
  return (
      <View className="h-full p-[10px]  bg-[#07161b] justify-center items-center ">
        <Text className="text-center mb-[20px] text-2xl text-white ">Hello, Manager good to see you.</Text>
        <TouchableOpacity onPress={LogoutFunction}>
          <Link className="text-center mb-[20px] text-2xl text-white " href="/">Logout</Link>
        </TouchableOpacity>
      </View>
  )
}

export default Accounts