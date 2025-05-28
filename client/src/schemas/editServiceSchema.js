import { z } from 'zod';

export const editServiceSchema = z.object({
  name: z
    .string('El campo nombre es necesario')
    .min(3, 'El campo nombre debe ser mayor de 3 carácteres')
    .max(200, 'El campo nombre debe ser menor de 30 carácteres'),

  price: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .min(0, 'El campo precio no puede ser negativo'),

  description: z
    .string('El campo descripción es obligatorio')
    .min(1, 'El campo descripción no puede estar vacío')
    .max(250, 'El campo descripción debe tener un máximo de 250 carácteres'),

  is_included: z.boolean('El campo is_included es obligatorio').default(false),

  max_total: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .min(0, 'El campo max_total no puede ser negativo'),
});
