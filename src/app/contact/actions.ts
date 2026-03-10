"use server";

import { z } from "zod";
import type { ContactFieldName, ContactFormResult } from "@/types/contact";

const contactFormSchema = z.object({
  parentGuardianName: z.string().trim().min(2, "Please share your name."),
  emailAddress: z.string().trim().email("Please enter a valid email address."),
  phoneNumber: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, "Please enter a valid phone number."),
  childAge: z.string().trim().max(40, "Please keep this brief.").optional(),
  familyNeeds: z.string().trim().min(12, "Please share a little more detail so we can help."),
  consentToPolicies: z.boolean().refine((value) => value, {
    message: "Please confirm that you agree to the Privacy Policy and Terms of Service.",
  }),
});

const fieldNames: ContactFieldName[] = [
  "parentGuardianName",
  "emailAddress",
  "phoneNumber",
  "childAge",
  "familyNeeds",
  "consentToPolicies",
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  const rawValues = {
    parentGuardianName: String(formData.get("parentGuardianName") ?? ""),
    emailAddress: String(formData.get("emailAddress") ?? ""),
    phoneNumber: String(formData.get("phoneNumber") ?? ""),
    childAge: String(formData.get("childAge") ?? ""),
    familyNeeds: String(formData.get("familyNeeds") ?? ""),
    consentToPolicies: formData.get("consentToPolicies") === "on",
  };

  const parsed = contactFormSchema.safeParse({
    ...rawValues,
    childAge: rawValues.childAge || undefined,
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      status: "error",
      message: "Please review the highlighted fields and try again.",
      fieldErrors: {
        parentGuardianName: fieldErrors.parentGuardianName?.[0],
        emailAddress: fieldErrors.emailAddress?.[0],
        phoneNumber: fieldErrors.phoneNumber?.[0],
        childAge: fieldErrors.childAge?.[0],
        familyNeeds: fieldErrors.familyNeeds?.[0],
        consentToPolicies: fieldErrors.consentToPolicies?.[0],
      },
    };
  }

  await sleep(900);

  console.info("NovaLeap contact form submission", parsed.data);

  return {
    status: "success",
    message: "Message sent! Our team will reach out shortly.",
  };
}