import { ZodError } from 'zod';

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'error de validacion' });
  }
};
