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
      <ScrollView style={{backgroundColor:"#07161b", height:"100%", padding:"10px"}}>
      <View className="h-full p-[10px] m-[10px] w-[95%] mx-auto  bg-[#07161b] justify-center items-center ">
        <Text style={{color:"white"}}  className="text-center mb-[20px] text-2xl text-white ">Hello, Finance officer good to see you.</Text>
        <TouchableOpacity onPress={LogoutFunction}>
          <Link style={{color:"white"}}  className="text-center mb-[20px] text-2xl text-white " href="/">Logout</Link>
        </TouchableOpacity>
      </View>
      </ScrollView>
  )
}

export default Accounts