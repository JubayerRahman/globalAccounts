import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation } from 'expo-router'
import { AuthContext } from '../AuthContext'
import axios from 'axios'

const index = () => {
    const {adminMail, dmanagerMail, cmanagerMail, smanagerMail, bmanagerMail, kmanagerMail, financemail, adminPass, managerPass, financePass, Role, setRole} = useContext(AuthContext)

    const [inputMail, setInputMail] = useState('')
    const [inputPass, setInputPass] = useState('')
    const Navigator = useNavigation()
    
    console.log(Role);
    useEffect(()=>{
      axios.get("https://global-acounts-backend.vercel.app/budget")
      .then(data => console.log(data.data))
    },[])

    const loginFunc = ()=>{
         if (inputMail === "" || inputPass === "") {
             Alert.alert("please input credentials first.")
         }
         else if (inputMail === adminMail && inputPass === adminPass) {
             setRole("Admin")
             Navigator.navigate("(tabs)")
             setInputMail("")
             setInputPass("")
         }
         else if (inputMail === dmanagerMail && inputPass === managerPass) {
             setRole("DManager")
             Navigator.navigate("(manageTabs)")
             setInputMail("")
             setInputPass("")
         }
         else if (inputMail === cmanagerMail && inputPass === managerPass) {
             setRole("CManager")
             Navigator.navigate("(manageTabs)")
             setInputMail("")
             setInputPass("")
         }
         else if (inputMail === smanagerMail && inputPass === managerPass) {
             setRole("SManager")
             Navigator.navigate("(manageTabs)")
             setInputMail("")
             setInputPass("")
         }
         else if (inputMail === bmanagerMail && inputPass === managerPass) {
             setRole("BManager")
             Navigator.navigate("(manageTabs)")
             setInputMail("")
             setInputPass("")
         }
         else if (inputMail === kmanagerMail && inputPass === managerPass) {
             setRole("KManager")
             Navigator.navigate("(manageTabs)")
             setInputMail("")
             setInputPass("")
         }
         else if (inputMail === financemail && inputPass === financePass) {
             setRole("Finance")
             Navigator.navigate("(financeTabs)")
             setInputMail("")
             setInputPass("")
         }
         else{
             Alert.alert("Please re-enter your credentials")
         }
    }

    
  return (
    <View className="items-center justify-center w-full h-full p-[30px]">
      <Image className="h-[200px] w-full mb-[20px]"  source={require("../assets/global.png")} />
      <Text className="text-4xl text-white mb-[20px]">Please login here.</Text>
      <TextInput value={inputMail} onChangeText={(text)=>setInputMail(text)}  className="bg-white p-[10px] rounded-xl w-full mb-[15px] "  placeholder='Your mail'/>
      <TextInput value={inputPass} onChangeText={(text)=>setInputPass(text)}  className="bg-white p-[10px] rounded-xl w-full mb-[15px] " secureTextEntry={true}  placeholder='your Password'/>
      <TouchableOpacity onPress={loginFunc}  className="bg-[#3d737f] p-[10px] rounded-xl w-full">
        <Text className="text-xl text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index