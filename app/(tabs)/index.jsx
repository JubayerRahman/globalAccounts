import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import useAxios from '../Hook/useAxios'

const index = () => {

  const [modalVisibility, setModalVisibility] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const [budget, setBudget] = useState("")
  const [month, setMoth] = useState("")
  const [spend, setspend] = useState(0)
  const Axios = useAxios()

  const ModalShow = (city)=>{
    setModalVisibility(true)
    setSelectedCity(city)    
  }

  const HideModal = ()=>{
    setModalVisibility(false)
    setSelectedCity("")
  }

  const settingBudgetFunction = () =>{
    if (budget === "" || month === "") {
      Alert.alert("fill the input fileds first")
    }
    else{
      const budgetData = {budget,spend, month, selectedCity}
      Axios.post("/budget", budgetData)
      .then(data=>{
        if (data.data.acknowledged === true) {
          Alert.alert("Budget set successfully.")
        }
        else{
          Alert.alert("there might me some error, try again later")
        }
      })
      setBudget("")
      setMoth("")
      HideModal()
    }
  }

  return (
    <ScrollView className="bg-[#28282B]">
      <View className="bg-[#28282B] mt-[50px] mb-[50px] h-full items-center justify-center">
          <Text onPress={()=>ModalShow("Dhaka")}  className="text-white w-[90%] mb-[15px] mx-auto rounded-xl pt-[40px] pb-[40px] text-center text-4xl bg-[#cec7bf] ">Dhaka</Text>
          <Text onPress={()=>ModalShow("Chattogram")}  className="text-white w-[90%] mb-[15px] mx-auto rounded-xl pt-[40px] pb-[40px] text-center text-4xl bg-[#cec7bf] ">Chattogram</Text>
          <Text onPress={()=>ModalShow("Sylhet")}  className="text-white w-[90%] mb-[15px] mx-auto rounded-xl pt-[40px] pb-[40px] text-center text-4xl bg-[#cec7bf] ">Sylhet</Text>
          <Text onPress={()=>ModalShow("Barishal")}  className="text-white w-[90%] mb-[15px] mx-auto rounded-xl pt-[40px] pb-[40px] text-center text-4xl bg-[#cec7bf] ">Barishal</Text>
          <Text onPress={()=>ModalShow("Khulna")}  className="text-white w-[90%] mb-[15px] mx-auto rounded-xl pt-[40px] pb-[40px] text-center text-4xl bg-[#cec7bf] ">Khulna</Text>
      <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisibility}
      onRequestClose={HideModal}
      >
        <View className="bg-white h-[300px] p-[20px] rounded-xl my-auto mt-[40%] w-[95%] mx-auto">
          <Text   className="text-right text-red-500 text-3xl w-fit "  onPress={HideModal}>X</Text>
          <Text  className="mt-[20px] text-xl mb-[20px]" >Please set budget limit for {selectedCity} branch</Text>
          <View className="flex-row  justify-between">
            <TextInput value={budget} onChangeText={(text)=>setBudget(text)}  placeholder='/==' keyboardType='number-pad' className="border-2 border-[#cec7bf] p-[5px] text-xl rounded-md w-[70%]" />
            <TextInput value={month} onChangeText={(text)=>setMoth(text.trim())}  placeholder='Month'  className="border-2 border-[#cec7bf] p-[5px] text-xl rounded-md w-[25%] " />
          </View>
          <Text onPress={settingBudgetFunction} className="mt-[20px] text-center bg-[#3d737f] text-white text-2xl p-[20px] rounded-xl">Set budget</Text>
        </View>
      </Modal>
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})