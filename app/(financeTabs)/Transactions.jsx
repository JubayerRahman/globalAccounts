import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAxios from '../Hook/useAxios'

const Transactions = () => {
  
  const [spentData, setSpentData] = useState([])
  const [loading, setLoading] = useState(false)
  const [budgetSpent, setBudgetSpent] = useState(0)
  const Axios = useAxios()

  useEffect(()=>{
    loadingData()
  },[])

  const loadingData = () =>{
    setLoading(true)
    Axios('/spent1?verify=notapproved')
    .then(data=> setSpentData(data.data))
    setLoading(false)
  }
  console.log(spentData);

  const approveFunction = (id, month, city, amount) => {
    const approve = 'approved';
    Axios.put(`/spent/${id}`, { approve })
      .then(response => {
        Axios.get(`/budget?currentMonth=${month}&city=${city}`)
          .then(response => {
            const currentSpend = response.data[0].spend || 0; 
  
            const newSpend = currentSpend + parseFloat(amount);
  
            Axios.put(`/budget?currentMonth=${month}&city=${city}`, { spend: newSpend })
              .then(response => {
                console.log(response.data);
                loadingData();
              })
              .catch(error => {
                console.error('Error updating budget:', error);
              });
          })
          .catch(error => {
            console.error('Error fetching current spend amount:', error);
          });
      })
      .catch(error => {
        console.error('Error approving transaction:', error);
      });
  };
  

  return (
    <View className="h-full p-[10px] bg-[#07161b] ">
      <FlatList
      data={spentData}
      keyExtractor={(item)=> item._id}
      renderItem={({item})=>(
        <View className="mb-[10px] rounded-xl p-[10px] border-2 h-fit border-[#cec7bf]">
          <Text className="text-white text-xl" >Date: {item.uploadDate}</Text>
          <Text className="text-white text-xl" >Branch: {item.beanchName}</Text>
          <Text className="text-white text-xl" >Amount: {item.amoutInput}</Text>
          <Text onPress={()=> approveFunction(item._id, item.currentMonth, item.beanchName, item.amoutInput) }  className={`${item.approve === "approved"?"text-white text-xl bg-green-500 p-[10px] rounded-xl mb-[10px] mbt-[10px] w-fit ": "text-white text-xl bg-red-500 p-[10px] rounded-xl mb-[10px] mbt-[10px] w-fit "  }`}>Aprove: {item.approve}</Text>
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