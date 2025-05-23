
import { ZodError } from "zod"

export const validateLogin = (schema) => (req, res, next) =>{
  try {
    schema.parse(req.body)
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({message: "error de validacion"})
      
  }
}


// export const validateLogin = (schema) => (req, res, next) =>{
//   try {
//     schema.parse(req.body)
//     console.log('validacion exitosa')
//     next();
//   } catch (err) {
//     console.log('errorvalidate', err)
//     if(err instanceof ZodError){
//       console.log("hola")
//     } else {
//       next (err);
//     }
//   }
// }