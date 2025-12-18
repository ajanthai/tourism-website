//import { successResponse, errorResponse } from '../utils/response';
const { Resend } = require("resend");
const supabase = require("../lib/supabaseClient");
const rateLimiter = require('../utils/rateLimiter');


const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function (context, req) {
  const { name, email, message } = req.body || {};
    const rate = rateLimiter(req);

    if (!rate.allowed) {
        context.res = {
            status: 429,
            body: {
                error: 'Too many requests. Please try again later.',
            },
        };
        return;
    }


  if (!name || !email || !message) {
    context.res = {
      status: 400,
      body:  { error: "Name, email, and message are required" }
    };
    return;
  }

  if (!email.includes('@')) {
    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
    };
  }

  try {
    // 1️ Save to DB
    const { error } = await supabase
      .from("inquiries")
      .insert([{ name, email, message }]);

    if (error) throw error;

    // 2️ Send email
    await resend.emails.send({
      from: "Gravityland Tours <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Tour Inquiry",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    // 3️ Send confirmation email to customer (non-blocking)
    try {
      await resend.emails.send({
        from: "Gravityland Tours <onboarding@resend.dev>",
        to: email,
        subject: "We received your inquiry",
        html: `
          <p>Hi ${name},</p>

          <p>Thank you for contacting <strong>Gravityland Tours</strong>.</p>

          <p>We’ve received your message and will get back to you within 24 hours.</p>

          <p>Warm regards,<br/>
          Gravityland Tours</p>
        `,
      });
    } catch (err) {
      context.log("Customer email failed:", err);
    }

    // 4 Respond LAST
    context.res = {
      status: 201,
      body: { success: true },
    };
  } catch (err) {
    context.log.error("Inquiry error:", err);

    context.res = {
      status: 500,
      body: { error: "Failed to process inquiry" },
    };
  }
};
