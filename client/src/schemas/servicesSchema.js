import {z} from 'zod'

export const serviceFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.coerce.number({invalid_type_error:"Debe ser un número"}).min(1, "El precio es obligatorio y debe ser un número"),
  description: z.string().min(1, "La descripción es obligatoria"),
  max_total: z.coerce.number({invalid_type_error:"Debe ser un número"}).min(1, "El total es obligatorio y debe ser un número"),
  service_img: z
  .instanceof(File, "La imagen es obligatoria")
  .refine((file)=> file.size > 0, {message: "La imagen es obligatoria"})
});
