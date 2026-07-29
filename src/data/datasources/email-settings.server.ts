import { promises as fs } from "node:fs";
import path from "node:path";
import {
  defaultEmailSettings,
  type EmailSettings,
} from "@/domain/entities/email-settings";

const DATA_DIR = path.join(process.cwd(), ".data");
const SETTINGS_PATH = path.join(DATA_DIR, "email-settings.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readEmailSettings(): Promise<EmailSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<EmailSettings>;
    return {
      ...defaultEmailSettings(),
      ...parsed,
      smtp: {
        ...defaultEmailSettings().smtp,
        ...(parsed.smtp ?? {}),
      },
      resend: {
        ...defaultEmailSettings().resend,
        ...(parsed.resend ?? {}),
      },
    };
  } catch {
    return defaultEmailSettings();
  }
}

export async function writeEmailSettings(
  settings: EmailSettings,
): Promise<EmailSettings> {
  await ensureDataDir();
  const next: EmailSettings = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export function maskEmailSettings(settings: EmailSettings): EmailSettings {
  return {
    ...settings,
    smtp: {
      ...settings.smtp,
      pass: settings.smtp.pass ? "••••••••" : "",
    },
    resend: {
      ...settings.resend,
      apiKey: settings.resend.apiKey ? "••••••••" : "",
    },
  };
}
