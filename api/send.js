/**
 * Vercel Serverless Function: Send Email with Input Sanitization & Validation
 * Dispatches to Resend API (if RESEND_API_KEY is configured) or Formspree
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim();
  const cleanSubject = (subject || '').trim();
  const cleanMessage = (message || '').trim();

  if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
    return res.status(400).json({ error: 'All fields are required and cannot be empty whitespace.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({ error: 'Invalid email address format.' });
  }

  if (cleanName.length > 100 || cleanSubject.length > 200 || cleanMessage.length > 5000) {
    return res.status(400).json({ error: 'Input field exceeds maximum allowed character length.' });
  }

  const safeName = escapeHtml(cleanName);
  const safeSubject = escapeHtml(cleanSubject);
  const safeMessage = escapeHtml(cleanMessage);

  try {
    const apiKey = process.env.RESEND_API_KEY || '';

    if (apiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['k.m.siam2019@gmail.com'],
          subject: `[Portfolio Inquiry] ${safeSubject} — from ${safeName}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; padding: 24px; border-radius: 12px;">
              <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 12px; margin-top: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 0.05em;">New Portfolio Inquiry</h2>
              <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${safeName}</p>
              <p style="margin: 8px 0;"><strong>Email Address:</strong> <a href="mailto:${cleanEmail}" style="color: #000; text-decoration: underline;">${cleanEmail}</a></p>
              <p style="margin: 8px 0;"><strong>Service Focus:</strong> ${safeSubject}</p>
              <div style="background-color: #f7f7f7; padding: 16px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #000;">
                <p style="margin-top: 0; font-weight: bold; color: #333; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message:</p>
                <p style="white-space: pre-wrap; margin-bottom: 0; color: #222;">${safeMessage}</p>
              </div>
            </div>
          `
        })
      });

      const responseData = await response.json();
      if (response.ok) {
        return res.status(200).json({ success: true, provider: 'resend', data: responseData });
      }
    }

    // Direct Formspree fallback
    const fsRes = await fetch('https://formspree.io/f/xovkboye', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: safeName,
        email: cleanEmail,
        subject: safeSubject,
        message: safeMessage
      })
    });

    if (fsRes.ok) {
      return res.status(200).json({ success: true, provider: 'formspree' });
    } else {
      const errData = await fsRes.json().catch(() => ({}));
      return res.status(400).json({ error: errData.error || 'Failed to dispatch via gateway' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error processing submission.' });
  }
};
