import {z} from "zod"

//login
export const loginSchema = z.object({
    citizenshipNum:  z.string()
    .min(1, "Citizenship number is required") // Ensure it's not empty
    .regex(/^\d+$/, "Citizenship number must contain only digits"),
    fullName: z.string().min(3, "must have at least 3 letters").max(30,"must have atmost 30 letters"),
    password: z.string().min(5, "must have at least 5 letters").max(15, "must have atmost 15 letters")
})

export type loginType = z.infer<typeof loginSchema>


//signup
export const signupSchema = z.object({

    citizenshipNum:  z.string()
    .min(1, "Citizenship number is required") // Ensure it's not empty
    .regex(/^\d+$/, "Citizenship number must contain only digits"),

    fullName: z.string().min(3, "must have at least 3 letters").max(30,"must have atmost 30 letters"),
    password: z.string().min(5, "must have at least 5 letters").max(15, "must have atmost 15 letters"),
    confirmPassword: z.string(),
    

    phoneNum: z.string()
    .min(1, "Citizenship number is required") // Ensure it's not empty
    .max(14, "maximum digit reached")
    .regex(/^\d+$/, "Citizenship number must contain only digits"),

    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Indicate the error on the confirmPassword field
  });

export type signupType = z.infer<typeof signupSchema>
