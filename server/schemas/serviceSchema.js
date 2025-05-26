import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "El precio debe ser un número válido",
    }),
  max_total: z
    .string()
    .refine((val) => !isNaN(parseInt(val)), {
      message: "El máximo total debe ser un número válido",
    }),
  service_id: z.string().optional(), // si estás editando
});