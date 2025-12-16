const supabase = require('../lib/supabaseClient');

module.exports = async function (context, req) {
  const { slug } = req.params;

  if (!slug) {
    context.res = {
      status: 400,
      body: { error: 'Tour slug is required' }
    };
    return;
  }

  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      context.res = {
        status: 404,
        body: { error: 'Tour not found' }
      };
      return;
    }

    context.res = {
      status: 200,
      body: data
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      body: { error: 'Failed to fetch tour' }
    };
  }
};
