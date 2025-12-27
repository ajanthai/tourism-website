const { success, error } = require('../utils/response');
const { Resend } = require("resend");
const supabase = require('../utils/supabase');
const rateLimiter = require('../utils/rateLimiter');


const resend = new Resend(process.env.RESEND_API_KEY);

const adminEmailHtml = ({ name, email, message, tour }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6">
    <h2>New Tour Inquiry</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${tour ? `<p><strong>Tour:</strong> ${tour}</p>` : ""}

    <hr />

    <p><strong>Message:</strong></p>
    <p>${message}</p>

    <hr />

    <p>
      👉 <a href="mailto:${email}">Reply via Email</a><br/>
      👉 <a href="https://wa.me/94774131314">Reply via WhatsApp</a>
    </p>

    <p style="font-size: 12px; color: #666">
      Gravityland Tours – Inquiry System
    </p>
  </div>
`;

const customerEmailHtml = ({ name, tour }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6">
    <h2>Hello ${name},</h2>

    <p>
      Thank you for contacting <strong>Gravityland Tours</strong> 🌿.
      We’ve received your inquiry${tour ? ` about <strong>${tour}</strong>` : ""}.
    </p>

    <p>
      Our team will review your message and get back to you shortly.
    </p>

    <hr />

    <p>
      📱 <strong>Need a faster response?</strong><br/>
      Chat with us on WhatsApp:
    </p>

    <p>
      <a
        href="https://wa.me/94XXXXXXXX"
        style="
          display: inline-block;
          padding: 10px 16px;
          background: #25D366;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        "
      >
        Chat on WhatsApp
      </a>
    </p>

    <hr />

    <p>
      Warm regards,<br/>
      <strong>Gravityland Tours</strong><br/>
      🌍 www.gravitylandtours.com
    </p>

    <p style="font-size: 12px; color: #666">
      This is an automated message. You can reply to this email if needed.
    </p>
  </div>
`;


module.exports = async function (context, req) {
  const { name, email, message } = req.body || {};
    const rate = rateLimiter(req);

    if (!rate.allowed) {
        context.res = error("Too many requests. Please try again later.", 429);
        return;
    }


  if (!name || !email || !message) {
    context.res = error("Name, email, and message are required", 400);
    return;
  }

  if (!email.includes('@')) {
    context.res = error("Invalid email address", 400);
    return;
  }

  try {
    // 1️ Save to DB
    const { error } = await supabase
      .from("inquiries")
      .insert([{ name, email, message }]);

    if (error) throw error;

    // 2️ Send email
    await resend.emails.send({
      from: "Gravityland Tours <noreply@gravitylandtours.com>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Tour Inquiry",
      html: adminEmailHtml({ name, email, message, tour }),
  });

    // 3️ Send confirmation email to customer (non-blocking)
    try {
      await resend.emails.send({
        from: "Gravityland Tours <noreply@gravitylandtours.com>",
        to: email,
        subject: "We received your inquiry",
        html: customerEmailHtml({ name, tour }),
  });
    } catch (err) {
      context.log("Customer email failed:", err);
    }

    // 4 Respond LAST
    success(context, 201, { success: true });
  } catch (err) {
    context.log.error("Inquiry error:", err);

    error(context, 500, "Failed to process inquiry");
  }
};
