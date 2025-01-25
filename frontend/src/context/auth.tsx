import { useState, createContext, ReactNode } from "react";
import { userType, authContextType } from "./type";

export const AuthContext = createContext <authContextType | undefined> (undefined)

export const AuthContextProvider = ({children}: {children: ReactNode}) =>{

    const [user, setUser] = useState<userType | undefined>()
    const [admin, setAdmin] = useState<boolean>(false)

    // const [user, setUser] = useState<userType>({
    //     citizenshipNum: "123123",
    //     fullname: "asdasdasd",
    //     password: "asdasdasd",
    //     role: "test"
    // })

   

    return <AuthContext.Provider value={{user, setUser, admin, setAdmin}}>
        {children}
    </AuthContext.Provider>


}