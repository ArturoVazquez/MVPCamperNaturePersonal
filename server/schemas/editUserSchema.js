import { z } from 'zod';

export const editUserSchema = z.object({
  name: z
    .string('El campo nombre es necesario')
    .min(3, 'El campo nombre debe ser mayor de 3 carácteres')
    .max(30, 'El campo nombre de ser menor de 30 carácteres'),
  lastname: z
    .string('El campo apellido es necesario')
    .min(3, 'El campo apellido debe ser mayor de 3 letras')
    .max(100, 'El campo apellido debe ser menor de 100 caracteres'),
  address: z
    .string('El campo dirección no es válida')
    .min(3, 'El campo dirección debe ser mayor de 3 letras')
    .max(200, 'El campo dirección debe ser menor de 200 caracteres')
    .nullable(),
  prefix: z
    .string('El campo prefijo no es válido')
    .min(2, 'El campo prefijo debe ser mayor de 2 caracteres')
    .max(10, 'El campo prefijo debe ser menor de 10 caracteres')
    .nullable(),
  phone: z
    .string('El campo teléfono no es válido')
    .min(6, 'El campo teléfono debe ser mayor de 6 caracteres')
    .max(30, 'El campo teléfono debe ser menor de 30 caracteres'),
  birth_date: z
    .string()
    .min(1, 'La fecha de nacimiento es obligatoria')
    .refine(
      (val) => {
        const birth = new Date(val);
        const today = new Date();
        // Normaliza ambas fechas quitando la hora
        const birthOnly = new Date(birth.toDateString());
        const todayOnly = new Date(today.toDateString());
        if (isNaN(birth)) return false;
        // No permitir fecha futura ni la de hoy
        if (birthOnly >= todayOnly) return false;
        const ageDiff = today.getFullYear() - birth.getFullYear();
        const hasBirthdayPassed =
          today.getMonth() > birth.getMonth() ||
          (today.getMonth() === birth.getMonth() &&
            today.getDate() >= birth.getDate());
        const age = hasBirthdayPassed ? ageDiff : ageDiff - 1;
        return age >= 16;
      },
      {
        message: 'Debes tener al menos 16 años y una fecha válida',
      }
    )
    .nullable(),
  country: z
    .string('El campo país no es válido')
    .min(3, 'El campo país debe ser mayor de 3 caracteres')
    .max(100, 'El campo país debe ser menor de 100 caracteres')
    .nullable(),
  document_type: z
    .string('El campo tipo de documento no es válido')
    .min(1, 'El campo tipo de documento debe ser mayor de 1 caracteres')
    .max(50, 'El campo tipo de documento debe ser menor de 50 caracteres')
    .nullable(),
  document_number: z
    .string()
    .min(4, 'El documento debe tener al menos 4 caracteres')
    .max(20, 'El documento debe tener máximo 20 caracteres')
    .regex(
      /^[a-zA-Z0-9\- ]+$/,
      'El documento solo puede contener letras, números, espacios y guiones'
    )
    .nullable(),
  car_registration: z
    .string('El campo matrícula de coche no es válido')
    .min(3, 'El campo matrícula de coche debe ser mayor de 3 caracteres')
    .max(30, 'El campo matrícula de coche debe ser menor de 30 caracteres')
    .nullable(),
  car_brand: z
    .string('El campo modelo de coche no es válido')
    .min(3, 'El campo modelo de coche debe ser mayor de 3 caracteres')
    .max(250, 'El campo modelo de coche debe ser menor de 250 caracteres')
    .nullable(),
});