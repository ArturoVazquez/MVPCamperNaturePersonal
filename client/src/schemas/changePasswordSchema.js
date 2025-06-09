import {z} from 'zod';
export const changePasswordSchema = z.object({
    newPassword:  z.string()
                .regex(/^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial"),
    repeatPassword: z.string().min(1,"Campo obligatorio").max(12, "Contraseña demasiado larga")
}).refine((data)=>data.newPassword === data.repeatPassword, {
    message: "las contraseñas no coinciden",
    path: ["repeatPassword"]
})