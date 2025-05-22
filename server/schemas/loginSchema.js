import {z} from 'zod'

export const loginSchema = z.object({
   email:z.string()
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email no es válido"),
})