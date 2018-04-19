const env = process.env.NODE_ENV || 'development';

if(env === 'development') {
  const config = require('./config.json');
  process.env.LOGIN_TOKEN = config.LOGIN_TOKEN;
}