function success(body, status) {
  return {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body || {}
  };
}

function error(message, status) {
  return {
    status: status || 500,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      error: message || 'Server error'
    }
  };
}

module.exports = {
  success,
  error
};
