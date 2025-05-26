import {ZodError} from "zod";

export const validateForgetPassword = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ message: 'Error de validación', errors: validationErrors });
    }

    return res.status(500).json({ message: 'Error inesperado en la validación' });
  }
};