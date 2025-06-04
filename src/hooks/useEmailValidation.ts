import { useMemo, useState, useEffect } from "react";

export type EmailValidationStatus = "neutral" | "valid" | "error";

interface UseEmailValidationReturn {
  isValid: boolean;
  status: EmailValidationStatus;
  errorMessage: string | null;
}

export const useEmailValidation = (
  email: string,
  debounceMs: number = 500
): UseEmailValidationReturn => {
  const [debouncedEmail, setDebouncedEmail] = useState(email);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(email);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [email, debounceMs]);

  const validation = useMemo(() => {
    // if email is empty, return neutral
    if (debouncedEmail.trim() === "") {
      return {
        isValid: false,
        status: "neutral" as EmailValidationStatus,
        errorMessage: null,
      };
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(debouncedEmail.trim());

    if (isValidEmail) {
      return {
        isValid: true,
        status: "valid" as EmailValidationStatus,
        errorMessage: null,
      };
    } else {
      return {
        isValid: false,
        status: "error" as EmailValidationStatus,
        errorMessage: "Ingresa un correo electrónico válido",
      };
    }
  }, [debouncedEmail]);

  // If current email is empty, always neutral (regardless of debouncedEmail)
  if (email.trim() === "") {
    return {
      isValid: false,
      status: "neutral",
      errorMessage: null,
    };
  }

  // If user is typing and email is not empty,
  // keep neutral state until typing is finished
  if (email !== debouncedEmail) {
    return {
      isValid: false,
      status: "neutral",
      errorMessage: null,
    };
  }

  return validation;
};
