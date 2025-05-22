import {z} from 'zod'

export const serviceFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.number().min(1, "El precio es obligatorio y debe ser un número"),
  description: z.string().min(1, "La descripción es obligatoria"),
  max_total: z.number().min(1, "El total es obligatorio y debe ser un número"),
});
export const fileSchema = z
  .custom((file) => file instanceof File && file.size > 0, {
    message: "La imagen es obligatoria",
  });