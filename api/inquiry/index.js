const { Resend } = require("resend");
const supabase = require("../lib/supabaseClient");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function (context, req) {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    context.res = {
      status: 400,
      body: { error: "Name, email, and message are required" },
    };
    return;
  }

  try {
    // 1️⃣ Save to DB
    const { error } = await supabase
      .from("inquiries")
      .insert([{ name, email, message }]);

    if (error) throw error;

    // 2️⃣ Send email
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

    // 3️⃣ Respond LAST
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
