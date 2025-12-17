import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function (context, req) {
  const { name, email, message } = req.body;

  // Save to DB
  await supabase.from("inquiries").insert({
    name,
    email,
    message,
  });

  // Send email
  await resend.emails.send({
    from: "Gravity Tours <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: "New Tour Inquiry",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `,
  });

  context.res = {
    status: 200,
    body: { success: true },
  };
}
