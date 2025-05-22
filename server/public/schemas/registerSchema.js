import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string("El campo nombre es necesario").min(3, "El nombre debe ser mayor de 3 letras").max(50, "El nombre debe ser menor de 50 caracteres"),
    lastname: z.string("El campo apellido es necesario").min(3, "El apellido debe ser mayor de 3 letras").max(100, "El apellido debe ser menor de 100 caracteres"),
    email: z.string().email("El mail no es válido"),
    password:  z.string()
                .regex(/^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "Contraseña no es válida"),
    repPassword: z.string()
}).refine((data)=>data.password === data.repPassword, {
    message: "las contraseñas no coinciden",
    path: ["repPassword"]
})