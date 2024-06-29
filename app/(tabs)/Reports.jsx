import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAxios from '../Hook/useAxios'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from "expo-file-system"

const Reports = () => {
  const Axios = useAxios()
  const [budgetData, setBudgetData] = useState([])

  useEffect(()=>{
    featchingData()
  },[])

  const featchingData = ()=>{
    Axios("/budget")
    .then(data => setBudgetData(data.data))
  }

  const pdfFunction = async (city, month, budget, spend)=>{

    const html = `
    <html>
    <body style="display: flex; flex-direction: column; justify-items: center;">
        <h1 style="text-align: center; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; ">shabuj global education</h1>
        <p style="text-align: center; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; ">Monthly expense summary report</p>
        <table border="1" style="width: 60%; margin-left: auto; margin-right: auto;">
            <tr>
                <td>Brnach</td>
                <td>${city}</td>
            </tr>
            <tr>
                <td>Month</td>
                <td>${month}</td>
            </tr>
            <tr>
                <td>budget</td>
                <td>${budget}</td>
            </tr>
            <tr>
                <td>spent</td>
                <td>${spend}</td>
            </tr>
        </table>
    </body>
</html>
    `
    const file = await printToFileAsync({
      html: html,
      base64: false,
    })

    const fileUri = `${FileSystem.documentDirectory}${city}-${month}-expense-Report.pdf`

    await FileSystem.moveAsync({
      from: file.uri,
      to: fileUri,
    });

    await shareAsync(fileUri)

    console.log(`PDF saved to: ${fileUri}`);
  }

  return (
    <View className="bg-[#28282B] h-full pt-[30px]"  >
      <FlatList
      data={budgetData}
      keyExtractor={(item)=> item._id}
      renderItem={({item})=>(
        <View className="w-[90%] p-[10px] border-2 rounded-xl mx-auto mt-[20px] flex-row items-center justify-between">
          <View>
            <Text className="text-xl text-white "  >Branch:{item.selectedCity}</Text>
            <Text className="text-xl text-white "  >Month:{item.month}</Text>
            <Text className="text-xl text-white "  >Budget:{item.budget}</Text>
            <Text className="text-xl text-white "  >Spent:{item.spend}</Text>
          </View>
          <Text onPress={()=>pdfFunction(item.selectedCity, item.month, item.budget, item.spend)} className="bg-[#3d737f] p-[10px] text-white rounded-xl text-xl">Save pdf</Text>
        </View>
      )}
      />
      <Text onPress={featchingData}  className="text-center w-[90%] mx-auto mt-[20px] mb-[10px] text-2xl bg-[#3d737f] p-[10px] rounded-xl text-white">Reload</Text>
    </View>
  )
}

export default Reports