const supabase = require('../lib/supabaseClient');

module.exports = async function (context, req) {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    context.res = {
      status: 400,
      body: { error: 'Name, email, and message are required' }
    };
    return;
  }

  try {
    const { error } = await supabase
      .from('inquiries')
      .insert([{ name, email, message }]);

    if (error) throw error;

    context.res = {
      status: 201,
      body: { success: true }
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      body: { error: 'Failed to save inquiry' }
    };
  }
};
