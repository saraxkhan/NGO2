import type { VercelRequest, VercelResponse } from "@vercel/node";

// Simple in-memory rate limiting per IP (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW_MS = 60 * 1000; // per 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Security Headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again in a minute." });
  }

  const { name, email, subject, message } = req.body || {};

  // Validation
  const errors: Record<string, string> = {};
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!email || !validateEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Validation failed", fields: errors });
  }

  // Send email via SMTP (Nodemailer) or any email provider
  // Configure CONTACT_EMAIL, SMTP_HOST, SMTP_USER, SMTP_PASS in .env
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Utkrast Foundation Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "utkrastfoundation61@gmail.com",
      replyTo: email.trim(),
      subject: `[Website Contact] ${subject.trim()}`,
      html: `
        <h2>New message from utkrastfoundation.org</h2>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Subject:</strong> ${subject.trim()}</p>
        <hr />
        <p>${message.trim().replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    // Return success anyway so attackers can't probe email config
    return res.status(200).json({ success: true });
  }
}
