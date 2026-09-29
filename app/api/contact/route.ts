import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to escape HTML characters in email output to avoid injection
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email format' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanProjectType = (projectType && typeof projectType === 'string') ? projectType.trim() : 'General Inquiry';
    const cleanMessage = message.trim();

    // 2. SMTP Environment Variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpSecure = smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'developer@usamafaheem.com';

    if (!smtpUser || !smtpPass) {
      console.error('[Contact API] SMTP credentials missing in environment variables (SMTP_USER or SMTP_PASS).');
      return NextResponse.json(
        {
          error: 'Email service is not yet fully configured on the server. Please check SMTP credentials.',
        },
        { status: 503 }
      );
    }

    // 3. Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });

    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const refNumber = 'UF-' + Math.floor(100000 + Math.random() * 900000);

    // 4. Realistic, high-end executive studio memo template (Email client safe with inline styles)
    const htmlContent = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Project Inquiry — ${escapeHtml(cleanName)}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f1f3f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
          
          <!-- Hidden preview text for inbox snippet -->
          <div style="display: none; font-size: 1px; color: #f1f3f6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            New client inquiry from ${escapeHtml(cleanName)}: &quot;${escapeHtml(cleanMessage.slice(0, 90))}&quot;...
          </div>

          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f3f6; padding: 40px 16px;">
            <tr>
              <td align="center">
                
                <!-- Main Container Card -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); overflow: hidden;">
                  
                  <!-- Top Studio Branding Header -->
                  <tr>
                    <td style="background-color: #0f172a; padding: 24px 32px; border-bottom: 3px solid #0052ff;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <div style="font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                              Usama Faheem • Studio Brief
                            </div>
                            <div style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                              New Client Project Inquiry
                            </div>
                          </td>
                          <td align="right" valign="middle">
                            <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.12); color: #cbd5e1; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px;">
                              ${refNumber}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Brief Content -->
                  <tr>
                    <td style="padding: 32px;">
                      
                      <!-- Intro Subhead -->
                      <p style="margin: 0 0 24px 0; font-size: 14.5px; line-height: 1.5; color: #475569;">
                        You have received a new contact inquiry submitted directly from your portfolio (<a href="https://usamafaheem.com" style="color: #0052ff; text-decoration: none; font-weight: 600;">usamafaheem.com</a>). Here are the details:
                      </p>

                      <!-- Key Information Grid Box -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 28px;">
                        <tr>
                          <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;" width="38%">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; display: block; margin-bottom: 4px;">Client Name</span>
                            <span style="font-size: 15px; font-weight: 600; color: #0f172a;">${escapeHtml(cleanName)}</span>
                          </td>
                          <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;" width="62%">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; display: block; margin-bottom: 4px;">Email Address</span>
                            <a href="mailto:${escapeHtml(cleanEmail)}" style="font-size: 15px; font-weight: 600; color: #0052ff; text-decoration: none;">${escapeHtml(cleanEmail)}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 20px;" width="38%">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; display: block; margin-bottom: 4px;">Project Scope</span>
                            <span style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(cleanProjectType)}</span>
                          </td>
                          <td style="padding: 16px 20px;" width="62%">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; display: block; margin-bottom: 4px;">Received At</span>
                            <span style="font-size: 13.5px; font-weight: 500; color: #334155;">${formattedDate} (PKT)</span>
                          </td>
                        </tr>
                      </table>

                      <!-- Message Memo Section -->
                      <div style="margin-bottom: 28px;">
                        <div style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #475569; margin-bottom: 8px;">
                          Project Overview &amp; Message
                        </div>
                        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #0052ff; border-radius: 6px; padding: 18px 20px; font-size: 14.5px; line-height: 1.7; color: #1e293b; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</div>
                      </div>

                      <!-- Action Button Row -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="left">
                            <a href="mailto:${escapeHtml(cleanEmail)}?subject=Re:%20Project%20Inquiry%20via%20UsamaFaheem.com&amp;body=Hi%20${encodeURIComponent(cleanName)},%0D%0A%0D%0AThank%20you%20for%20reaching%20out!%20" 
                               style="display: inline-block; background-color: #0052ff; color: #ffffff; font-size: 13.5px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; letter-spacing: 0.3px; text-transform: uppercase;">
                              Reply to ${escapeHtml(cleanName)}
                            </a>
                          </td>
                          <td align="right">
                            <a href="https://usamafaheem.com" style="font-size: 12.5px; font-weight: 600; color: #64748b; text-decoration: none;">
                              View Portfolio &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Authentic Realistic Email Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px; text-align: center;">
                      <p style="margin: 0; font-size: 11.5px; color: #64748b; line-height: 1.5;">
                        Sent automatically from the contact engine on <strong style="color: #334155;">usamafaheem.com</strong><br />
                        Location: Lahore, Pakistan • Direct Webmail Delivery
                      </p>
                    </td>
                  </tr>

                </table>
                
              </td>
            </tr>
          </table>

        </body>
      </html>
    `;

    const textContent = `
USAMA FAHEEM • STUDIO BRIEF
New Client Project Inquiry [${refNumber}]
--------------------------------------------------
Client Name:   ${cleanName}
Email:         ${cleanEmail}
Project Scope: ${cleanProjectType}
Received At:   ${formattedDate} (PKT)

Message:
${cleanMessage}
--------------------------------------------------
To reply directly, email: ${cleanEmail}
Website: https://usamafaheem.com
    `;

    // 5. Client Auto-Responder Confirmation Email Template
    const clientHtmlContent = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Thanks for reaching out — Usama Faheem</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f1f3f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
          
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f3f6; padding: 40px 16px;">
            <tr>
              <td align="center">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); overflow: hidden;">
                  
                  <!-- Top Header -->
                  <tr>
                    <td style="background-color: #0f172a; padding: 24px 32px; border-bottom: 3px solid #0052ff;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <div style="font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                              Usama Faheem • Portfolio
                            </div>
                            <div style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                              Inquiry Received
                            </div>
                          </td>
                          <td align="right" valign="middle">
                            <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.12); color: #cbd5e1; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px;">
                              ${refNumber}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 32px;">
                      
                      <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a;">
                        Hi ${escapeHtml(cleanName)},
                      </h2>

                      <p style="margin: 0 0 16px 0; font-size: 14.5px; line-height: 1.65; color: #334155;">
                        Thank you for getting in touch through my portfolio (<a href="https://usamafaheem.com" style="color: #0052ff; text-decoration: none; font-weight: 600;">usamafaheem.com</a>). I have received your message regarding <strong>${escapeHtml(cleanProjectType)}</strong>.
                      </p>

                      <p style="margin: 0 0 24px 0; font-size: 14.5px; line-height: 1.65; color: #334155;">
                        I review every inquiry personally and will get back to you within <strong>24 hours</strong> with thoughts, timeline estimations, and proposed next steps.
                      </p>

                      <!-- Submitted Message Recap -->
                      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0052ff; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
                        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 8px;">
                          A copy of your message:
                        </div>
                        <div style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</div>
                      </div>

                      <!-- Urgent WhatsApp Callout -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin-bottom: 28px;">
                        <tr>
                          <td style="padding: 16px 20px;">
                            <div style="font-size: 13.5px; font-weight: 700; color: #166534; margin-bottom: 4px;">
                              Need an immediate response?
                            </div>
                            <div style="font-size: 13px; color: #15803d; line-height: 1.5; margin-bottom: 12px;">
                              If your project is time-sensitive or you prefer instant messaging, feel free to text me directly on WhatsApp.
                            </div>
                            <a href="https://wa.me/923143416588?text=Hi%20Usama,%20I%20just%20submitted%20an%20inquiry%20on%20your%20website%20(Ref:%20${refNumber})" 
                               style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 12.5px; font-weight: 700; text-decoration: none; padding: 8px 18px; border-radius: 6px; letter-spacing: 0.3px;">
                              Chat on WhatsApp &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Sign-off -->
                      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                        <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #0f172a;">
                          Best regards,
                        </p>
                        <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #0052ff;">
                          Usama Faheem
                        </p>
                        <p style="margin: 0; font-size: 12.5px; color: #64748b; line-height: 1.5;">
                          MERN Stack &amp; Frontend Developer • Founder of Tekrivo<br />
                          Lahore, Pakistan • <a href="mailto:developer@usamafaheem.com" style="color: #64748b; text-decoration: none;">developer@usamafaheem.com</a> • <a href="https://usamafaheem.com" style="color: #0052ff; text-decoration: none;">usamafaheem.com</a>
                        </p>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; text-align: center;">
                      <p style="margin: 0; font-size: 11.5px; color: #94a3b8;">
                        This is an automated confirmation of your inquiry submission on usamafaheem.com.
                      </p>
                    </td>
                  </tr>

                </table>
                
              </td>
            </tr>
          </table>

        </body>
      </html>
    `;

    const clientTextContent = `
Hi ${cleanName},

Thank you for reaching out through my portfolio (https://usamafaheem.com). I have received your project inquiry regarding "${cleanProjectType}".

I review every message personally and will get back to you within 24 hours with ideas, timeline estimations, and proposed next steps.

---
A copy of your message:
${cleanMessage}
---

Need an urgent answer? Text me on WhatsApp: https://wa.me/923143416588

Best regards,
Usama Faheem
MERN Stack & Frontend Developer | Founder of Tekrivo
developer@usamafaheem.com
    `;

    // 6. Send Both Emails in Parallel (Owner Lead Notification + Client Auto-Confirmation)
    const ownerMailPromise = transporter.sendMail({
      from: `"Portfolio Contact Engine" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `New Project Inquiry [${refNumber}]: ${cleanName} (${cleanProjectType})`,
      text: textContent,
      html: htmlContent,
    });

    const clientMailPromise = transporter.sendMail({
      from: `"Usama Faheem" <${smtpUser}>`,
      to: cleanEmail,
      replyTo: receiverEmail,
      subject: `Thanks for reaching out, ${cleanName}! — Usama Faheem [${refNumber}]`,
      text: clientTextContent,
      html: clientHtmlContent,
    });

    const [ownerResult, clientResult] = await Promise.allSettled([
      ownerMailPromise,
      clientMailPromise,
    ]);

    if (ownerResult.status === 'rejected') {
      console.error('[Contact API] Failed to send email to owner:', ownerResult.reason);
      throw ownerResult.reason;
    }

    if (clientResult.status === 'rejected') {
      console.warn('[Contact API] Client auto-responder delivery failed:', clientResult.reason);
      // We don't fail the request since owner email was received successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been delivered successfully! Usama will get back to you shortly.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('[Contact API Error]:', err);
    return NextResponse.json(
      {
        error: err.message || 'An error occurred while sending the message. Please try again later.',
      },
      { status: 500 }
    );
  }
}
