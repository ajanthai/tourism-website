const { app } = require('@azure/functions');

app.http('hello', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'hello',
  handler: async () => {
    return { body: 'Hello World' };
  }
});

app.http('tours', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'tours',
  handler: async () => {
    return { body: 'All tours' };
  }
});

app.http('tours-by-slug', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'tours/{slug}',
  handler: async (req) => {
    return { body: `Tour: ${req.params.slug}` };
  }
});

app.http('contact', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'contact',
  handler: async () => {
    return { body: 'Contact saved' };
  }
});
