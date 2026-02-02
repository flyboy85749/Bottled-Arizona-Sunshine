import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function sendEmail(to: string, subject: string, html: string) {
  return transporter.sendMail({
    from: `"Bottled Arizona Sunshine" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

function brandedWrapper(content: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#fdf8f3;font-family:'Helvetica Neue',Arial,sans-serif;color:#2d2926;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f5a623,#e8734a);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:700;">☀️ Bottled Arizona Sunshine</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#2d2926;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#a89888;font-size:13px;">
              Bottled Arizona Sunshine &bull; Tucson, AZ<br/>
              <a href="https://bottledarizonasunshine.com" style="color:#f5a623;text-decoration:none;">bottledarizonasunshine.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function sendOrderConfirmation(
  customer: { email: string; firstName: string },
  product: string,
  quantity: number,
  total: string
) {
  const html = brandedWrapper(`
    <h2 style="margin:0 0 8px;color:#2d2926;font-size:22px;">Thanks for your order, ${customer.firstName}! 🌵</h2>
    <p style="color:#6b5e54;margin:0 0 24px;">Your sunshine is on the way. Side effects may include spontaneous happiness and an inexplicable craving for desert air.</p>
    <table width="100%" cellpadding="12" cellspacing="0" style="background:#fdf8f3;border-radius:12px;margin-bottom:24px;">
      <tr>
        <td style="font-weight:600;color:#2d2926;border-bottom:1px solid #e8ddd3;">Product</td>
        <td style="color:#6b5e54;border-bottom:1px solid #e8ddd3;">${product}</td>
      </tr>
      <tr>
        <td style="font-weight:600;color:#2d2926;border-bottom:1px solid #e8ddd3;">Quantity</td>
        <td style="color:#6b5e54;border-bottom:1px solid #e8ddd3;">${quantity}</td>
      </tr>
      <tr>
        <td style="font-weight:600;color:#2d2926;">Total</td>
        <td style="color:#e8734a;font-weight:700;font-size:18px;">${total}</td>
      </tr>
    </table>
    <p style="color:#6b5e54;margin:0;">We'll send you tracking info once your bottled sunshine ships. If you have any questions, just reply to this email — we don't bite (the sun might, though).</p>
  `);

  return sendEmail(customer.email, "Your Arizona Sunshine Order Confirmation ☀️", html);
}

export function sendOrderNotification(
  customer: { email: string; firstName: string },
  product: string,
  quantity: number,
  total: string,
  paymentMethod: string
) {
  const html = `
    <h3>New Order Received</h3>
    <ul>
      <li><strong>Customer:</strong> ${customer.firstName} (${customer.email})</li>
      <li><strong>Product:</strong> ${product}</li>
      <li><strong>Quantity:</strong> ${quantity}</li>
      <li><strong>Total:</strong> ${total}</li>
      <li><strong>Payment:</strong> ${paymentMethod}</li>
    </ul>
  `;

  return sendEmail(process.env.ADMIN_EMAIL!, `New Order: ${product} x${quantity} — ${paymentMethod}`, html);
}

export function sendContactFormEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const html = `
    <h3>Contact Form Submission</h3>
    <ul>
      <li><strong>From:</strong> ${name} (${email})</li>
      <li><strong>Subject:</strong> ${subject}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <blockquote style="border-left:3px solid #f5a623;padding-left:12px;color:#6b5e54;">
      ${message.replace(/\n/g, "<br/>")}
    </blockquote>
    <p><em>Reply directly to this email to respond to ${name}.</em></p>
  `;

  return sendEmail(process.env.ADMIN_EMAIL!, `Contact: ${subject} — from ${name}`, html);
}
