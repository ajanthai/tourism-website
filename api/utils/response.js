// api/utils/response.js

export const jsonHeaders = {
  'Content-Type': 'application/json',
};

export function successResponse(context, status = 200, body = {}) {
  context.res = {
    status,
    headers: jsonHeaders,
    body,
  };
}

export function errorResponse(context, status = 500, message = 'Something went wrong') {
  context.res = {
    status,
    headers: jsonHeaders,
    body: { error: message },
  };
}
