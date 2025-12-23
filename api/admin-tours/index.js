const supabase = require("../utils/supabase");
const jwt = require("jsonwebtoken");

module.exports = async function (context, req) {
  context.res = {
    status: 200,
    body: {
      ok: true,
      function: context.executionContext.functionName
    }
  };
};

