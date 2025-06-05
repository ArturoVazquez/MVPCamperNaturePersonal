import { z } from 'zod';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const reservaCalendarSchema = z
  .object({
    firstSelected: z
      .date({
        required_error: 'La fecha de entrada es obligatoria',
        invalid_type_error: 'La fecha de entrada no es válida',
      })
      .refine((date) => date >= today, {
        message: 'La fecha de entrada no puede ser anterior a hoy',
      }),
    secondSelected: z.date({
      required_error: 'La fecha de salida es obligatoria',
      invalid_type_error: 'La fecha de salida no es válida',
    }),
  })
  .refine((data) => data.secondSelected > data.firstSelected, {
    message: 'La fecha de salida debe ser posterior a la de entrada',
    path: ['secondSelected'],
  });
