import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const TO_EMAIL = 'mohammed.m.elalimy@gmail.com';

const allowedSubjects = [
  'Full-Stack Development',
  'Shopify Development',
  'Freelance Project',
  'Job Opportunity',
  'Other'
];

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, email, subject, message } = data;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json({ success: false, error: 'Invalid form data.' }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (
      !cleanName ||
      cleanName.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      cleanEmail.length > 254 ||
      !allowedSubjects.includes(subject) ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 4000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please check your form details.'
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      console.error('Contact email is not configured');

      return NextResponse.json(
        {
          success: false,
          error: 'Email service is unavailable.'
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: fromEmail,
      to: [TO_EMAIL],
      replyTo: cleanEmail,
      subject: `[Portfolio] ${subject}`,
      text: [
        'New Portfolio Contact',
        '',
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        cleanMessage
      ].join('\n')
    });

    if (result.error || !result.data?.id) {
      console.error('Resend error:', result.error);

      return NextResponse.json(
        {
          success: false,
          error: 'Unable to send the message. Please try again.'
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again.'
      },
      { status: 500 }
    );
  }
}
