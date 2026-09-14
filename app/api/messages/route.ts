import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/auth';
import { classifyMessage } from '@/lib/spamFilter';

/** At most this many accepted messages per IP per hour. */
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function ipHashOf(req: NextRequest) {
  // Vercel sets x-forwarded-for; take the client-most entry.
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
    || req.headers.get('x-real-ip')
    || 'unknown';
  return createHash('sha256').update(ip).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Bots are dropped with a 200 and no stored row: telling them why just
    // helps them adapt, and an error would prompt a retry.
    const verdict = classifyMessage(body);
    if (verdict.spam) {
      console.warn('[messages] rejected as spam:', verdict.reason);
      return NextResponse.json({ success: true });
    }

    const ipHash = ipHashOf(req);
    const recent = await prisma.message.count({
      where: { ipHash, createdAt: { gte: new Date(Date.now() - RATE_WINDOW_MS) } },
    });
    if (recent >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 }
      );
    }

    const saved = await prisma.message.create({
      data: { name, email, phone, message, ipHash },
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP not configured');
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      );
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@sanatanmahaparishad.org',
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nMessage: ${message}`,
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Message API error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = verifyAdminToken(req);
  if (!token) return unauthorizedResponse();

  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ messages });
  } catch (err: any) {
    console.error('Message API error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
