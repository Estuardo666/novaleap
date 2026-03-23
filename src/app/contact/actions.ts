"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import type { ContactFieldName, ContactFormResult } from "@/types/contact";

let contactTransporter: nodemailer.Transporter | null = null;

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

const getRequiredEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatOptional = (value: string | undefined): string => {
  if (!value) {
    return "Not provided";
  }

  return value;
};

const buildTeamEmailHtml = (payload: {
  parentGuardianName: string;
  emailAddress: string;
  phoneNumber: string;
  childAge?: string;
  familyNeeds: string;
}): string => {
  const childAge = formatOptional(payload.childAge);
  const emailFontStack = '"Google Sans", "Product Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f7fbfb;font-family:${emailFontStack};color:#11224e;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;background:#f7fbfb;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #dfe7f0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:24px;background:linear-gradient(135deg,#11224e 0%,#2a3f76 100%);color:#ffffff;">
                <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#7fe6e5;">New Contact Request</p>
                <h1 style="margin:0;font-size:24px;line-height:1.2;">NovaLeap Website Inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#304265;">A parent or caregiver submitted the contact form. Details are below.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 10px;">
                  <tr>
                    <td style="width:190px;padding:10px 12px;background:#f4f8ff;border-radius:10px;font-weight:700;color:#11224e;">Parent / Guardian</td>
                    <td style="padding:10px 12px;background:#f9fbff;border-radius:10px;color:#2a3f76;">${escapeHtml(payload.parentGuardianName)}</td>
                  </tr>
                  <tr>
                    <td style="width:190px;padding:10px 12px;background:#f4f8ff;border-radius:10px;font-weight:700;color:#11224e;">Email</td>
                    <td style="padding:10px 12px;background:#f9fbff;border-radius:10px;color:#2a3f76;">${escapeHtml(payload.emailAddress)}</td>
                  </tr>
                  <tr>
                    <td style="width:190px;padding:10px 12px;background:#f4f8ff;border-radius:10px;font-weight:700;color:#11224e;">Phone</td>
                    <td style="padding:10px 12px;background:#f9fbff;border-radius:10px;color:#2a3f76;">${escapeHtml(payload.phoneNumber)}</td>
                  </tr>
                  <tr>
                    <td style="width:190px;padding:10px 12px;background:#f4f8ff;border-radius:10px;font-weight:700;color:#11224e;">Child's Age</td>
                    <td style="padding:10px 12px;background:#f9fbff;border-radius:10px;color:#2a3f76;">${escapeHtml(childAge)}</td>
                  </tr>
                </table>
                <div style="margin-top:18px;padding:14px;border:1px solid #dce6f6;border-radius:12px;background:#fcfeff;">
                  <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#00b7b5;">Family Needs</p>
                  <p style="margin:0;font-size:15px;line-height:1.65;color:#2a3f76;white-space:pre-wrap;">${escapeHtml(payload.familyNeeds)}</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const buildTeamEmailText = (payload: {
  parentGuardianName: string;
  emailAddress: string;
  phoneNumber: string;
  childAge?: string;
  familyNeeds: string;
}): string => {
  return [
    "New contact request from NovaLeap website",
    "",
    `Parent / Guardian: ${payload.parentGuardianName}`,
    `Email: ${payload.emailAddress}`,
    `Phone: ${payload.phoneNumber}`,
    `Child's Age: ${formatOptional(payload.childAge)}`,
    "",
    "Family Needs:",
    payload.familyNeeds,
  ].join("\n");
};

const buildClientEmailHtml = (payload: {
  parentGuardianName: string;
  familyNeeds: string;
}): string => {
  const emailFontStack = '"Google Sans", "Product Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f7fbfb;font-family:${emailFontStack};color:#11224e;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;background:#f7fbfb;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #dfe7f0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:24px;background:linear-gradient(135deg,#977abc 0%,#00b7b5 100%);color:#ffffff;">
                <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#f2fbff;">NovaLeap</p>
                <h1 style="margin:0;font-size:24px;line-height:1.2;">We received your message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 12px 0;font-size:16px;line-height:1.6;color:#2a3f76;">Hi ${escapeHtml(payload.parentGuardianName)},</p>
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.7;color:#304265;">Thank you for contacting NovaLeap Pediatric Physical Therapy. Our team received your message and will reach out shortly.</p>
                <div style="margin:16px 0;padding:14px;border:1px solid #dce6f6;border-radius:12px;background:#fcfeff;">
                  <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#00b7b5;">Your Message</p>
                  <p style="margin:0;font-size:15px;line-height:1.65;color:#2a3f76;white-space:pre-wrap;">${escapeHtml(payload.familyNeeds)}</p>
                </div>
                <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;color:#304265;">If your question is urgent, you can call us at <strong>(845) 801 9053</strong>.</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#304265;">Warmly,<br /><strong>The NovaLeap Team</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const buildClientEmailText = (payload: { parentGuardianName: string; familyNeeds: string }): string => {
  return [
    `Hi ${payload.parentGuardianName},`,
    "",
    "Thank you for contacting NovaLeap Pediatric Physical Therapy.",
    "We received your message and will reach out shortly.",
    "",
    "Your Message:",
    payload.familyNeeds,
    "",
    "If your question is urgent, call us at (845) 801 9053.",
    "",
    "Warmly,",
    "The NovaLeap Team",
  ].join("\n");
};

const getContactTransporter = (): nodemailer.Transporter => {
  if (contactTransporter) {
    return contactTransporter;
  }

  const smtpHost = getRequiredEnv("TITAN_SMTP_HOST");
  const smtpPortRaw = process.env.TITAN_SMTP_PORT?.trim() ?? "465";
  const smtpPort = Number(smtpPortRaw);
  const smtpUser = getRequiredEnv("TITAN_SMTP_USER");
  const smtpPass = getRequiredEnv("TITAN_SMTP_PASS");

  if (Number.isNaN(smtpPort)) {
    throw new Error("Invalid TITAN_SMTP_PORT value.");
  }

  contactTransporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    pool: true,
    maxConnections: 1,
    maxMessages: 100,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  return contactTransporter;
};

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

  const smtpUser = getRequiredEnv("TITAN_SMTP_USER");
  const smtpFrom = process.env.TITAN_SMTP_FROM?.trim() || smtpUser;
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || smtpUser;
  const transporter = getContactTransporter();

  const submission = parsed.data;

  try {
    await Promise.all([
      transporter.sendMail({
        from: `NovaLeap Contact <${smtpFrom}>`,
        to: notificationEmail,
        replyTo: `${submission.parentGuardianName} <${submission.emailAddress}>`,
        subject: `New Contact Form Inquiry - ${submission.parentGuardianName}`,
        html: buildTeamEmailHtml(submission),
        text: buildTeamEmailText(submission),
      }),
      transporter.sendMail({
        from: `NovaLeap Team <${smtpFrom}>`,
        to: submission.emailAddress,
        replyTo: notificationEmail,
        subject: "We received your message | NovaLeap",
        html: buildClientEmailHtml(submission),
        text: buildClientEmailText(submission),
      }),
    ]);
  } catch (error) {
    console.error("Contact form email sending failed", error);

    return {
      status: "error",
      message: "We could not send your message right now. Please try again shortly.",
    };
  }

  console.info("NovaLeap contact form email sent", {
    parentGuardianName: submission.parentGuardianName,
    emailAddress: submission.emailAddress,
  });

  return {
    status: "success",
    message: "Message sent! Our team will reach out shortly.",
  };
}