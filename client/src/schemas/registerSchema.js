import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().email("El mail no es válido"),
    password:  z.string()
                .regex(/^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial"),
    repPassword: z.string()
}).refine((data)=>data.password === data.repPassword, {
    message: "las contraseñas no coinciden",
    path: ["repPassword"]
})