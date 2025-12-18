// api/utils/response.js

export const jsonHeaders = {
  'Content-Type': 'application/json',
};

export function success(context, status = 200, body = {}) {
  context.res = {
    status,
    headers: jsonHeaders,
    body,
  };
}

export function error(context, status = 500, message = 'Something went wrong') {
  context.res = {
    status,
    headers: jsonHeaders,
    body: { error: message },
  };
}
