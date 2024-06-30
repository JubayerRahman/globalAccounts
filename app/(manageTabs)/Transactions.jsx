import { View, Text, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../Hook/useAxios'
import { AuthContext } from '../../AuthContext'

const Transactions = () => {
  const Axios = useAxios()
  const [spentData, setSpentData] = useState([])
  const {Role} = useContext(AuthContext)

  const currentBranch = 
  Role === "DManager" ? "Dhaka" : 
  Role === "CManager"? "Chattogram" : 
  Role === "SManager" ? "Sylhet" :
  Role === "BManager" ? "Barishal" :
  Role === "KManager" ? "Khulna" : "unknown"

  useEffect(()=>{
    Axios(`/spent?city=${currentBranch}`)
    .then(data=> setSpentData(data.data))
  },[])

  console.log(spentData);

  return (
    <View className="h-full p-[10px] bg-[#07161b] ">
      <FlatList
      data={spentData}
      keyExtractor={(item)=> item._id}
      renderItem={({item})=>(
        <View className="mb-[10px] rounded-xl p-[10px] border-2 h-fit border-[#cec7bf]">
          <Text className="text-white text-xl" >Date: {item.uploadDate}</Text>
          <Text className="text-white text-xl" >Amount: {item.amoutInput}</Text>
          <Text className={`${item.approve === "approved"?"text-white text-xl bg-green-500 p-[10px] rounded-xl mb-[10px] mbt-[10px] w-fit ": "text-white text-xl bg-red-500 p-[10px] rounded-xl mb-[10px] mbt-[10px] w-fit "  }`}>Aprove: {item.approve}</Text>
          {
            item.uploadedBillLink &&
          <Image className="w-[200px] h-[200px] mx-auto"  source={{ uri:`${item.uploadedBillLink}`}} />
           } 
        </View>
      )}
      />
    </View>
  )
}

export default Transactions