import {z} from 'zod'

//election creation

export const electionCreationSchema = z.object({

    electionTitle: z.string().min(5),

    candidate: z.array(
                    z.object({
                        name: z.string().min(3, "minimum 3 letters required").max(30, "max 30 letters"),
                        partyName: z.string().min(3, "minimum 3 letters required").max(30, "max 30 letters"),
                        partyLogo: z.string().min(3, "minimum 3 letters required").max(30, "max 30 letters"),
                        profile:z.string().min(3, "minimum 3 letters required").max(30, "max 30 letters"),
                        vote: z.number()
                    })  
                ),
    
    
})

export type electionCreationType = z.infer<typeof electionCreationSchema>