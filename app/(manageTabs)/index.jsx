import { View, Text, ScrollView, TextInput, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAxios from '../Hook/useAxios'
import * as ImagePicker from "expo-image-picker"
import axios, { all } from 'axios'
import { AuthContext } from '../../AuthContext'

const Index = () => {

  const [MonthData, setMonthData] = useState([])
  const data = new Date()
  const month = data.getMonth()
  const [billImage, setBillImage] = useState(null)
  const imageUploadUrl = `https://api.imgbb.com/1/upload?key=4f76c18e33ad9cd249d69804ea663a74`
  const [uploadedBillLink, setUploadedBillLink] = useState("null")
  const [amoutInput, setAmountInput] = useState("")
  const [beanchName, setBranchName] = useState("")
  const [loading, setLoading] = useState(false)
  const months = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];

  const currentMonth = months.filter((m, index) => index === month )[0]
  const day = data.getDate()
  const year = data.getFullYear()
  const uploadDate = day+ " / "+ currentMonth + " / " + year

  const Axios = useAxios()

  const {Role} = useContext(AuthContext)

  const currentBranch = 
  Role === "DManager" ? "Dhaka" : 
  Role === "CManager"? "Chattogram" : 
  Role === "SManager" ? "Sylhet" :
  Role === "BManager" ? "Barishal" :
  Role === "KManager" ? "Khulna" : "unknown"

  useEffect(()=>{
    Axios(`/budget?currentMonth=${currentMonth}&city=${currentBranch}`)
    .then(data => setMonthData(data.data))
  },[])

  useEffect(()=>{
    if (MonthData.length> 0) {
     setBranchName(MonthData[0].selectedCity);
    }
  },[MonthData])

  const pickDocument = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })

    if (!result.canceled) {
      setBillImage(result.assets[0].uri)
    }
  }

  const SubmitFunction =()=>{
    if (billImage === "" || amoutInput === "") {
      Alert.alert("inset documents First.")
    }
    else{
      const formData = new FormData()
      setLoading(true)
      formData.append("image", {
        uri: billImage,
        name: 'photo.jpg',
        type: 'image/jpeg'
      } )
      axios.post(imageUploadUrl, formData, {
        headers: {
          "content-type": "multipart/form-data",
        }
      })
      .then(res=>{
        if (res?.data?.data?.display_url){
          setUploadedBillLink(res?.data?.data?.display_url);

          // Now the Api making
          const approve = "notapproved"
          const spentData = {beanchName,amoutInput, currentMonth,  uploadDate, "uploadedBillLink": `${res?.data?.data?.display_url}`, approve}
          Axios.post("/spent", spentData)
          .then(data=>{
            if (data.data.acknowledged === true){
              Alert.alert("Your data is stored wait for approval thanks.")
              // setBillImage("null")
              setAmountInput('')
              setLoading(false)
          }
        })

        }
        else{
          Alert.alert("System is facing some issue try again later")
        }
      })
    }
  }
  console.log(uploadedBillLink);
  
  return (
    <ScrollView style={{backgroundColor:"#07161b", height:"100%", padding:"10px"}}>
      <View className="h-full p-[10px] bg-[#07161b] ">
        {
          MonthData? MonthData.map(data=>

            <View key={data._id} className="mt-[20%]">
              <Text className="text-4xl text-white text-left font-bold">Hi manager,</Text>
              <Text className="text-3xl text-white text-left font-bold">Here is your this months budget limit: {data.budget}</Text>
              <Text className="text-3xl text-white text-left font-bold">spent: {data.spend}</Text>
              <Text className="text-center text-4xl mt-[30px] text-white mb-[20px] ">List spending:</Text>
              <Text className={`${loading ? "block text-2xl text-green-500  text-center":"hidden"}`}>Uploading data please wait</Text>
              <TextInput value={amoutInput} onChangeText={(text)=>setAmountInput(text)}  className="text-xl p-[10px] bg-white  rounded-xl border-[#cec7bf] border-2" keyboardType='number-pad'  placeholder='Amount' />
                <Image className="h-[100px] w-[100px] border-2 mx-auto mt-[10px] mb-[10px]" source={{uri:`${billImage}`}} />
              <View className="flex-row items-center">
              <Text onPress={pickDocument}  className="text-2xl text-center mt-[20px] p-[10px] rounded-xl bg-[#3d737f] w-[47%] mx-auto">Upload Bill</Text>
              <Text onPress={SubmitFunction}  className="text-2xl text-center mt-[20px] p-[10px] rounded-xl bg-[#3d737f] w-[47%] mx-auto">Submit</Text>
              </View>
            </View>
          )
          : <Text className="text-2xl text-white text-left">Loading...</Text>
        }
      </View>
    </ScrollView>
  )
}

export default Index