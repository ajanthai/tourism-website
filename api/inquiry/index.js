const { Resend } = require("resend");

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

    context.res = {
      status: 201,
      body: { success: true },
    };
  } catch (err) {
    context.log.error("Email send failed:", err);

    context.res = {
      status: 500,
      body: { error: "Failed to send email" },
    };
  }
};
