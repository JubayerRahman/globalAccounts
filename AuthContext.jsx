import { View, Text } from 'react-native'
import {createContext, useState} from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [Role, setRole] = useState("")

    const contextValue = {
      adminMail:   "admingmail@gmail.com",
      dmanagerMail: "dmanager@gmail.com",
      cmanagerMail: "cmanager@gmail.com",
      smanagerMail: "smanager@gmail.com",
      bmanagerMail: "bmanager@gmail.com",
      kmanagerMail: "kmanager@gmail.com",
      financemail: "finance@gmail.com",
      adminPass:   "admin100global",
      managerPass: "manager100global",
      financePass: "finance100global",
      Role,
      setRole,
    }
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider