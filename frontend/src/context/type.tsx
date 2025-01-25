export type userType = {
    fullName: string,
    password: string,
    citizenshipNum: string,
    role: "admin" | "citizen" | "test",
}

export type authContextType = {
    user: userType | undefined,
    setUser: React.Dispatch<React.SetStateAction<userType | undefined>>,
    admin: boolean,
     setAdmin: React.Dispatch<React.SetStateAction<boolean>>,
}

