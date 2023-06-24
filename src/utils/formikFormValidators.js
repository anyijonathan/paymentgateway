import * as yup from "yup";
import {
  FCMBEmailStructure,
  passwordStructure,
  phoneNumberStructure,
  urlStructure,
} from "./constants";

export const staffLoginSchema = yup.object({
  emailAddress: yup.string().required("Enter email").email("Invalid email"),
  password: yup
    .string()
    .required("Enter your password")
    .min(5, "Password should be of minimum 5 characters length"),
  token: yup
    .string()
    .required("Enter token")
    .min(5, "Token should be of minimum 5 characters length")
    .max(10, "Token should be of maximum 10 characters length"),
});

export const merchantLoginSchema = yup.object({
  emailAddress: yup.string().required("Enter email").email("Invalid email"),
  password: yup
    .string()
    .required("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
});

export const resetPasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Enter your current password")
    .min(8, "Password should be of minimum 8 characters length"),
  newPassword: yup
    .string()
    .required("Enter new password")
    .notOneOf([yup.ref("oldPassword"), null], "New password cannot be the same as the old one")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      passwordStructure,
      "Must contain one uppercase, one lowercase, one number and one special-case character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm new password")
    .oneOf([yup.ref("newPassword"), null], "Password does not match"),
});

export const changePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("Enter new password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      passwordStructure,
      "Must contain  one uppercase, lowercase, number and special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm new password")
    .oneOf([yup.ref("newPassword"), null], "Password does not match"),
});

export const createMerchantSchema = yup.object({
  emailAddress: yup.string().required("Enter email").email("Invalid email"),
  phoneNumber: yup
    .string()
    .required("Enter your phone number")
    .min(9, "Phone number should be of minimum 9 characters length")
    .max(15, "Phone number should be of maximum 15 characters length")
    .matches(phoneNumberStructure, "Invalid phone number"),
});

export const editMerchantSchema = yup.object({
  phoneNumber: yup
    .string()
    .required("Enter your phone number")
    .min(9, "Phone number should be of minimum 9 characters length")
    .max(15, "Phone number should be of maximum 15 characters length")
    .matches(phoneNumberStructure, "Invalid phone number"),
});

export const validateEmailSchema = yup.object({
  emailAddress: yup
    .string()
    .required("Enter staff email")
    .email("Invalid email")
    .matches(FCMBEmailStructure, "Invalid FCMB domain email"),
});

export const updateMerchantSchema = yup.object({
  displayName: yup.string().required("Enter a display name").min(2, "Invalid input"),
  website: yup.string().required("Enter your website URL").matches(urlStructure, "Invalid URL"),
  callbackUrl: yup.string().required("Enter a callback URL").matches(urlStructure, "Invalid URL"),
});
