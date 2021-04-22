const {Response} = require('@model');

module.exports = {
  buildOkResponse(value) {
    const ok = 'ok';
    return new Response(ok, value);
  },
};
