import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);

let blocklist: string[];

export interface DisposableEmailResponse {
  email: string;
  isDisposable: boolean;
}

async function isDisposableEmail(email: string) {
  if (!blocklist) {
    const filePath = join(__filename, "../", "disposable_email_blocklist.conf");
    const content = await fs.readFile(filePath, { encoding: "utf-8" });
    blocklist = content.split(/\r?\n/).filter(Boolean);
  }
  return blocklist.includes(email.split("@")[1]);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = z.string().email("Invalid email format").parse(body.email);
    const isDisposable = await isDisposableEmail(email);
    return NextResponse.json({ email, isDisposable });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Email không hợp lệ", isValid: false }, { status: 400 });
    }
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 });
  }
}
