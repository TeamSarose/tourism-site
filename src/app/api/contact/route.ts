import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, subject, message, package: selectedPackage } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Configure your SMTP transport (use environment variables in production)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER, // your receiving email
    subject: subject || `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPackage: ${selectedPackage}\nMessage: ${message}`,
    replyTo: email,
  };

  await transporter.sendMail(mailOptions);
  return NextResponse.json({ success: true });
} 