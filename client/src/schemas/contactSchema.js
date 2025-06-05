import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string('El campo de nombre es necesario')
    .min(3, 'El nombre debe ser mayor de 3 carácteres')
    .max(30, 'El nombre debe ser menor de 30 carácteres'),
  email: z.string().email('El email no es válido'),
  message: z
    .string('Escribe tu mensaje para poder comunicarte con nosotros')
    .min(10, 'El mensaje debe contener al menos 10 carácteres')
    .max(650, 'El mensaje debe ser inferior a 300 carácteres'),
});
