import nodemailer from 'nodemailer';

const LIMITS = { name: 100, company: 100, email: 200, phone: 50, subject: 150, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentSubmissions = new Map();

// Best effort only: serverless instances are recycled, so a determined sender
// can reset this by landing on a cold instance.
function isRateLimited(ip) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentSubmissions.set(ip, hits);
  return hits.length > RATE_MAX;
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = req.body ?? {};

  // Honeypot: hidden from real users, so anything here is a bot. Report success
  // rather than an error so the bot has no signal to adapt to.
  if (clean(body.website, 100)) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const company = clean(body.company, LIMITS.company);
  const email = clean(body.email, LIMITS.email);
  const phone = clean(body.phone, LIMITS.phone);
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please complete the required fields.' });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const ip = (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages sent. Please try again later.' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error('Contact form is missing SMTP configuration.');
    return res.status(500).json({ error: 'Unable to send your message right now.' });
  }

  const port = Number(SMTP_PORT) || 465;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"ZENDIA website" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name}" <${email}>`,
      subject: subject ? `ZENDIA enquiry: ${subject}` : 'ZENDIA website enquiry',
      text: [
        `Name: ${name}`,
        `Company: ${company || '-'}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form send failed:', error);
    return res.status(500).json({ error: 'Unable to send your message right now.' });
  }
}
