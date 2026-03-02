import { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormState {
  status: "idle" | "loading" | "success" | "error";
  fieldErrors: Partial<Record<keyof ContactFormData, string>>;
  globalError: string;
}

const INITIAL: ContactFormData = { name: "", email: "", subject: "", message: "" };

function validateForm(data: ContactFormData): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email.";
  if (!data.subject.trim() || data.subject.trim().length < 3) errors.subject = "Subject must be at least 3 characters.";
  if (!data.message.trim() || data.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [state, setState] = useState<FormState>({ status: "idle", fieldErrors: {}, globalError: "" });

  const setField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    setState((prev) => ({
      ...prev,
      fieldErrors: { ...prev.fieldErrors, [field]: undefined },
    }));
  };

  const submit = async () => {
    const fieldErrors = validateForm(form);
    if (Object.keys(fieldErrors).length > 0) {
      setState({ status: "idle", fieldErrors, globalError: "" });
      return;
    }

    setState({ status: "loading", fieldErrors: {}, globalError: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.fields) {
          setState({ status: "idle", fieldErrors: data.fields, globalError: data.error || "Validation error." });
        } else {
          setState({ status: "error", fieldErrors: {}, globalError: data.error || "Failed to send. Please try again." });
        }
        return;
      }

      setState({ status: "success", fieldErrors: {}, globalError: "" });
      setForm(INITIAL);
    } catch {
      setState({ status: "error", fieldErrors: {}, globalError: "Network error. Please check your connection and try again." });
    }
  };

  return { form, state, setField, submit };
}
