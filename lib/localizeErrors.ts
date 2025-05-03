import { ZodFormattedError } from "zod";
import type { FormData } from "@/app/join/membershipTypes";

export const getLocalizedErrors = (
  errors: ZodFormattedError<FormData>,
  language: "en" | "hi" = "en"
): Record<string, string> => {
  const messages: Record<string, Record<string, string>> = {
    en: {
      name: "Name is required",
      dateOfBirth: "Date of birth is required",
      sonDaughterOf: "Parent's name is required",
      residentialAddress: "Residential address is required",
      mobileNumber: "Mobile number is required",
      email: "Valid email is required",
    },
    hi: {
      name: "नाम आवश्यक है",
      dateOfBirth: "जन्म तिथि आवश्यक है",
      sonDaughterOf: "पिता/माता का नाम आवश्यक है",
      residentialAddress: "निवास का पता आवश्यक है",
      mobileNumber: "मोबाइल नंबर आवश्यक है",
      email: "मान्य ईमेल पता आवश्यक है",
    },
  };

  const langMessages = messages[language];
  const localizedErrors: Record<string, string> = {};

  const fieldErrors = (errors as any).formErrors?.fieldErrors ?? {}; // fallback if not present

  for (const key in fieldErrors) {
    if (fieldErrors[key]?.length) {
      localizedErrors[key] = langMessages[key] || fieldErrors[key][0];
    }
  }

  return localizedErrors;
};
