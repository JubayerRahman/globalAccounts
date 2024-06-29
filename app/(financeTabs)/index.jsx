import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAxios from '../Hook/useAxios'

const Index = () => {
  const Axios = useAxios()
  const [budgetData, setBudgetData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    LoadingData()
  },[])

  const LoadingData =  ()=>{
    setLoading(true)
    Axios("/budget")
    .then(data=> setBudgetData(data.data))
    setLoading(false)
  }
  return (
      <View className="h-full p-[10px] bg-[#07161b] ">
        {
          loading? <Text classname="text-center text-4xl text-green-500">Loading Pleasw wait</Text>:
          <FlatList
          data={budgetData}
          keyExtractor={(item)=> item._id}
      renderItem={({item})=>(
        <View className="bg-[#cec7bf] rounded-xl p-[10px] mb-[10px] ">
          <Text className="text-[#3d737f] text-4xl">{item.selectedCity}</Text>
          <Text className="text-[#3d737f] text-2xl">Month:{item.month}</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-[#3d737f] text-2xl">Budget: {item.budget}</Text>
            <Text className="text-[#3d737f] text-2xl">Spent: {item.spend}</Text>
          </View>
        </View>
      )}
          />
        }
      </View>
  )
}

export default Index