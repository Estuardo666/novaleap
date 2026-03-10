export type ContactFieldName =
  | "parentGuardianName"
  | "emailAddress"
  | "phoneNumber"
  | "childAge"
  | "familyNeeds"
  | "consentToPolicies";

export interface ContactFormResult {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactFieldName, string>>;
}

export type ContactSubmitAction = (formData: FormData) => Promise<ContactFormResult>;