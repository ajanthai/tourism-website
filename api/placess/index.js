const supabase = require('../lib/supabaseClient');

module.exports = async function (context, req) {
  if (!supabase) {
    context.res = { status: 500, body: { error: 'Supabase not configured' } };
    return;
  }

  try {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    context.res = {
      status: 200,
      body: result
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      body: { error: 'Internal server error' }
    };
  }
};
