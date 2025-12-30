const supabase = require("../lib/supabaseClient");

module.exports = async function (context, req) {
  try {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    context.res = {
      status: 200,
      body: data
    };
  } catch (err) {
    context.log.error("Tours error:", err);

    context.res = {
      status: 500,
      body: { error: "Failed to fetch tours" }
    };
  }
};
