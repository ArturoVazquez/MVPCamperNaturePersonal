import { z } from 'zod';

const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/;

export const contactSchema = z.object({
  name: z
    .string('El campo de nombre es necesario')
    .min(3, 'El nombre debe ser mayor de 3 carácteres')
    .max(30, 'El nombre debe ser menor de 30 carácteres')
    .refine((val) => !emojiRegex.test(val), {
    message: 'No se permiten emojis en el campo nombre',
  }),
  email: z.string().email('El email no es válido'),
  message: z
    .string('Escribe tu mensaje para poder comunicarte con nosotros')
    .min(10, 'El mensaje debe contener al menos 10 carácteres')
    .max(300, 'El mensaje debe ser inferior a 300 carácteres')
    .refine((val) => !emojiRegex.test(val), {
    message: 'No se permiten emojis en el mensaje',
  }),
});
