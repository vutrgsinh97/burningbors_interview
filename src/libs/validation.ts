import { validateString } from "@/configs/validateString";
import * as yup from "yup";

export const schemaLoginForm = yup
  .object({
    username: yup.string().trim().required(validateString.loginForm.username),
    password: yup.string().trim().required(validateString.loginForm.password),
  })
  .required();
