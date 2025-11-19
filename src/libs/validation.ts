import { validateString } from "@/configs/validateString";
import parsePhoneNumberFromString from "libphonenumber-js";
import * as yup from "yup";
import { isValidCardNumber } from "./utils";

export const schemaLoginForm = yup
  .object({
    username: yup.string().trim().required(validateString.loginForm.username),
    password: yup.string().trim().required(validateString.loginForm.password),
  })
  .required();

export const schemaCheckoutForm = yup.object({
  name: yup.string().trim().required(validateString.checkoutCartForm.name),
  phone: yup
    .string()
    .trim()
    .required(validateString.checkoutCartForm.phone)
    .test("is-valid-phone", "Phone number is invalid", (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber ? phoneNumber.isValid() : false;
    }),
  email: yup
    .string()
    .required(validateString.checkoutCartForm.email)
    .email("Email not correct format")
    .matches(
      /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
      "Email must include a valid domain"
    ),
  postalCode: yup
    .string()
    .trim()
    .required(validateString.checkoutCartForm.postalCode),
  streetAddress: yup
    .string()
    .trim()
    .required(validateString.checkoutCartForm.streetAddress),
  detailedAddress: yup
    .string()
    .trim()
    .required(validateString.checkoutCartForm.detailedAddress),
  deliveryNotes: yup.string().nullable().notRequired(),
  cardNumber: yup
    .string()
    .trim()
    .required(validateString.checkoutCartForm.cardNumber)
    .test("only-numbers", "Only numbers allowed", (value) => {
      if (!value) return false;
      const sanitized = value.replace(/\s+/g, "");
      return /^\d+$/.test(sanitized);
    })
    .test("is-valid-card", "Card number is invalid", (value) => {
      if (!value) return false;
      const sanitized = value.replace(/\s+/g, "");
      return isValidCardNumber(sanitized);
    }),
  expiryDate: yup
    .string()
    .trim()
    .required(validateString.checkoutCartForm.expiryDate),
  CVV: yup.string().trim().required(validateString.checkoutCartForm.CVV).max(3, "CVV must be 3 digits."),
  paymentMethod: yup
    .string()
    .required(validateString.checkoutCartForm.paymentMethod),
});
