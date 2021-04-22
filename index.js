require('module-alias/register');

const config = require('config');
const logger = require('@logger');

const app = require('express')();
app.use('/', require('./api'));

const {port, host}= config.get('serverConfig');
app.listen(port, host, () => {
  logger.info(`listening on ${host} on port ${port}`);
});
