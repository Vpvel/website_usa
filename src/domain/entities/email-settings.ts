export type EmailProvider = "smtp" | "resend";

export type ContactFormType = "sample" | "general";

export interface EmailSettings {
  enabled: boolean;
  provider: EmailProvider;
  fromName: string;
  fromEmail: string;
  replyToFallback: string;
  sampleTo: string;
  generalTo: string;
  cc: string;
  subjectSamplePrefix: string;
  subjectGeneralPrefix: string;
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
  };
  resend: {
    apiKey: string;
  };
  updatedAt: string;
}

export interface ContactEmailPayload {
  type: ContactFormType;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  interest?: string;
  notes?: string;
  message?: string;
}

export const defaultEmailSettings = (): EmailSettings => ({
  enabled: false,
  provider: "smtp",
  fromName: "Angel Starch Website",
  fromEmail: "noreply@angelstarch.com",
  replyToFallback: "usa@angelstarch.com",
  sampleTo: "usa@angelstarch.com",
  generalTo: "usa@angelstarch.com",
  cc: "",
  subjectSamplePrefix: "[Sample Request]",
  subjectGeneralPrefix: "[Contact]",
  smtp: {
    host: "",
    port: 587,
    secure: false,
    user: "",
    pass: "",
  },
  resend: {
    apiKey: "",
  },
  updatedAt: new Date().toISOString(),
});
